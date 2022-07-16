import { Clinic, Twitter } from "@prisma/client";
import { twitterRepository } from "./repository/twitterRepository";

export const twitterService = () => {
  const { getTwittersLimit } = twitterRepository();

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

  return {
    getTwittersRamdom,
  };
};
