import { AboutCategory } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { AboutCategoryService } from "services/orm/about-categories/get";

export default async function getAboutCategoryByOriginId(
  req: NextApiRequest,
  res: NextApiResponse<AboutCategory[]>
) {
  const originId = req.query.originId as string;
  const aboutService = new AboutCategoryService();
  const data = await aboutService.getAboutCategoryByOriginId(originId);
  // デフォルト
  // const data: AboutCategory[] = await getAxios(
  //   "about-category/originId/" + originId
  // );
  res.json(data);
  return data;
}
