import { AboutCategory } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { aboutCategoryRepository } from "services/common/repository";

export default async function getAboutCategoryByOriginId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const originId = req.query.originId as string;
  const gender = req.query.gender as string;

  // 女性:1 男性:2
  const excludeGender = gender === "男性" ? 1 : 2;

  const data = await aboutCategoryRepository.getJoinBasicParts(
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
