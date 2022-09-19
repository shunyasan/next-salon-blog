import { NextApiRequest, NextApiResponse } from "next";
import { IdAndNameRepository } from "services/repository/IdAndNameRepository";
import { IdAndNameDto } from "types/IdAndNameDto";

const { getAllAboutCategoriesIdAndName } = IdAndNameRepository();

export default async function getAboutCategories(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>
): Promise<IdAndNameDto[]> {
  const originCategoryId = req.query.originCategoryId as string;
  const aboutCategoryId = (req.query.aboutCategoryId as string) || "";
  const data = await getAllAboutCategoriesIdAndName(
    originCategoryId,
    aboutCategoryId
  );

  res.json(data);
  return data;
}
