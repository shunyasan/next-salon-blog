import { BaseParts } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { basePartsService } from "services/service";

export default async function getAllBasePartsByAboutCategoryId(
  req: NextApiRequest,
  res: NextApiResponse<BaseParts[]>
  // aboutCategoryId: string,
  // gender: string
): Promise<BaseParts[]> {
  const aboutCategoryId = req.query.aboutCategoryId as string;
  const gender = req.query.gender as string;
  const data = await basePartsService.getAllBasePartsByAboutCategoryId(
    aboutCategoryId,
    gender
  );

  // const query = "?gender=" + gender;
  // const data: BaseParts[] = await getAxios(
  //   "base-parts/aboutCategoryId/" + aboutCategoryId + query
  // );
  res.json(data);
  return data;
}
