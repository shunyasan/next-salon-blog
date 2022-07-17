import { prisma } from "services/common/prisma";

export const twitterRepository = () => {
  const getTwittersLimit = async (
    take: number,
    skip: number,
    orderBy: "asc" | "desc"
  ) => {
    return prisma.twitter.findMany({
      include: { clinic: true },
      take: take,
      skip: skip,
      orderBy: {
        id: orderBy,
      },
    });
  };

  const getTwittersRamdom = async (take: number) => {
    const max = 11;
    const random = Math.floor(Math.random() * (max - take));
    const orderBy = random % 2 === 0 ? "asc" : "desc";
    const data = await getTwittersLimit(take, random, orderBy);
    // const res: (Twitter & {
    //   clinic: Clinic;
    // })[] = JSON.parse(JSON.stringify(data));
    return data;
  };

  return { getTwittersRamdom };
};
