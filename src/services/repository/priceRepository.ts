import { prisma } from "services/common/prisma";
import { PagenationParameter } from "types/PagenationParameterDto";

export const priceRepository = () => {
  const getPlanByClinicId = async (
    clinicId: string,
    pagenation?: PagenationParameter
  ) => {
    const data = await prisma.price.findMany({
      where: { clinicId: clinicId },
      take: pagenation ? pagenation.take : 2,
      skip: pagenation ? pagenation.skip : 0,
    });
    return data;
  };

  return { getPlanByClinicId };
};
