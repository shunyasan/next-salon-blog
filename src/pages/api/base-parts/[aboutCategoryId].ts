import { BaseParts, Gender } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { basePartsRepository } from "services/common/repository";

export default async function getAllBasePartsByAboutCategoryId(
  req: NextApiRequest,
  res: NextApiResponse<BaseParts[]>
  // aboutCategoryId: string,
  // gender: string
): Promise<BaseParts[]> {
  const aboutCategoryId = req.query.aboutCategoryId as string;
  const gender = req.query.gender as Gender;
  const data = await basePartsRepository.getAllBasePartsByAboutCategoryId(
    aboutCategoryId
  );

  // const query = "?gender=" + gender;
  // const data: BaseParts[] = await getAxios(
  //   "base-parts/aboutCategoryId/" + aboutCategoryId + query
  // );
  res.json(data);
  return data;
}
