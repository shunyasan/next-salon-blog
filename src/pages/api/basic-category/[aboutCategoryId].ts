import { BaseParts, BasicCategory, Gender } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { basePartsRepository } from "services/common/repository";
import { BasicCategoryRepository } from "services/repository/basicCategoryRepository";

const { getBasicCategoryByaboutId } = BasicCategoryRepository();

export default async function getAllBasePartsByAboutCategoryId(
  req: NextApiRequest,
  res: NextApiResponse<BasicCategory[]>
): Promise<BasicCategory[]> {
  const aboutCategoryId = req.query.aboutCategoryId as string;
  const gender = req.query.gender as Gender;

  const data = await getBasicCategoryByaboutId(aboutCategoryId);

  res.json(data);
  return data;
}
