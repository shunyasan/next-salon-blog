import { prisma } from "services/prisma";

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

  return { getTwittersLimit };
};
