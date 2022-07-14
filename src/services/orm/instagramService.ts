import { Clinic, Instagram } from "@prisma/client";
import { InstagramRepository } from "./repository/InstagramRepository";

export const instagramService = () => {
  const { getInstagramLimit } = InstagramRepository();

  const getInstagramRamdom = async (take: number) => {
    const max = 11;
    const random = Math.floor(Math.random() * (max - take));
    const orderBy = random % 2 === 0 ? "asc" : "desc";
    const data = await getInstagramLimit(take, random, orderBy);
    return data;
  };

  return {
    getInstagramRamdom,
  };
};
