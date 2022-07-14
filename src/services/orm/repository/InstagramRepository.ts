import { Clinic, Instagram } from "@prisma/client";
import { prisma } from "services/prisma";

export const InstagramRepository = () => {
  const getInstagramLimit = async (
    take: number,
    skip: number,
    orderBy: "asc" | "desc"
  ) => {
    const data = await prisma.instagram.findMany({
      include: { clinic: true },
      take: take,
      skip: skip,
      orderBy: {
        id: orderBy,
      },
    });
    return data;
  };

  return { getInstagramLimit };
};
