import { AboutCategory } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { aboutCategoryService } from "services/service";

export default async function getAboutCategoryByOriginId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const originId = req.query.originId as string;
  const gender = req.query.gender as string;

  // 女性:1 男性:2
  const excludeGender = gender === "男性" ? 2 : 1;

  const data = await aboutCategoryService.getJoinBasicPartsd(
    originId,
    excludeGender
  );
  // デフォルト
  // const data: AboutCategory[] = await getAxios(
  //   "about-category/originId/" + originId
  // );
  res.json(data);
  return data;
}
