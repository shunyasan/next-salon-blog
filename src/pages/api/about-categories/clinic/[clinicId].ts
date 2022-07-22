import { NextApiRequest, NextApiResponse } from "next";
import { aboutCategoryRepository } from "services/common/repository";
import { IdAndNameRepository } from "services/repository/IdAndNameRepository";
import { IdAndNameDto } from "types/IdAndNameDto";

const { getAllAboutCategoriesIdAndName } = IdAndNameRepository();

export default async function getAboutCategories(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>
) {
  const clinicId = req.query.clinicId as string;
  const originId = req.query.originId as string;
  const data = await aboutCategoryRepository.getAboutCategoryByOriginIdAndPrice(
    originId,
    clinicId
  );

  res.json(data);
  return data;
}
