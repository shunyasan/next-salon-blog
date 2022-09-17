import { prisma } from "services/common/prisma";
import { PriceForColumn } from "types/PriceForColumn";

export const priceForColumnRepository = () => {
  const getRandomPriceColumnSelect = async () => {
    const random = Math.floor(Math.random() * 70);
    const price = await prisma.price.findMany({
      distinct: ["clinicId"],
      select: {
        id: true,
        name: true,
        price: true,
        clinic: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
      },
      skip: random,
      take: 20,
      orderBy: {
        name: "desc",
      },
    });

    const priceForColumns = price.map((data) => {
      const res: PriceForColumn = {
        priceId: data.id,
        priceName: data.name,
        price: data.price,
        clinicId: data.clinic.id,
        clinic: data.clinic.name,
        picture: data.clinic.picture[0],
      };
      return res;
    });

    return priceForColumns;
  };

  return {
    getRandomPriceColumnSelect,
  };
};
