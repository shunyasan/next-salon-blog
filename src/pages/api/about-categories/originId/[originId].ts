import { AboutCategory } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { aboutCategoryRepository } from "services/common/repository";

export default async function getAboutCategoryByOriginId(
  req: NextApiRequest,
  res: NextApiResponse<AboutCategory[]>
) {
  const originId = req.query.originId as string;
  const data = await aboutCategoryRepository.getAllAboutCategoryByOriginId(
    originId
  );
  // デフォルト
  // const data: AboutCategory[] = await getAxios(
  //   "about-category/originId/" + originId
  // );
  res.json(data);
  return data;
}
