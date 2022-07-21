import { Clinic, Instagram } from "@prisma/client";
import { prisma } from "services/common/prisma";

export const InstagramRepository = () => {
  const getInstagramLimit = async (
    take: number,
    skip: number,
    orderBy: "asc" | "desc"
  ) => {
    const data = await prisma.instagram.findMany({
      // include: { clinic: true },
      take: take,
      skip: skip,
      orderBy: {
        id: orderBy,
      },
    });
    return data;
  };

  const getInstagramRamdom = async (take: number) => {
    const max = 11;
    const random = Math.floor(Math.random() * (max - take));
    const orderBy = random % 2 === 0 ? "asc" : "desc";
    const data = await getInstagramLimit(take, random, orderBy);
    return data;
  };

  return { getInstagramRamdom };
};
