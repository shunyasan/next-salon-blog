import { NextApiRequest, NextApiResponse } from "next";
import { BaseParts } from "types/api/BaseParts";
import { getAxios } from "../../../services/orm/get";

export default async function getAllBasePartsByAboutCategoryId(
  req: NextApiRequest,
  res: NextApiResponse<BaseParts[]>
  // aboutCategoryId: string,
  // gender: string
): Promise<BaseParts[]> {
  const aboutCategoryId = req.query.aboutCategoryId;
  const gender = req.query.gender;

  const query = "?gender=" + gender;
  const data: BaseParts[] = await getAxios(
    "base-parts/aboutCategoryId/" + aboutCategoryId + query
  );
  res.json(data);
  return data;
}
