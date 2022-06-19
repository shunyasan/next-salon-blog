import { AboutCategory } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { AboutCategoryService } from "services/orm/about-categories/get";

export default async function getAboutCategoryByOriginId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const originId = req.query.originId as string;
  const gender = req.query.gender as string;

  // 女性:1 男性:2
  const excludeGender = gender === "男性" ? 2 : 1;

  const aboutService = new AboutCategoryService();
  const data = await aboutService.getJoinBasicPartsd(originId, excludeGender);
  // デフォルト
  // const data: AboutCategory[] = await getAxios(
  //   "about-category/originId/" + originId
  // );
  res.json(data);
  return data;
}
