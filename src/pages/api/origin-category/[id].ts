import { NextApiRequest, NextApiResponse } from "next";
import { IdAndNameRepository } from "services/repository/IdAndNameRepository";
import { IdAndNameDto } from "types/IdAndNameDto";

const { getOriginBySortSelected } = IdAndNameRepository();
export default async function getOriginCategories(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>

  // originCategoryId: string
) {
  const originCategoryId = req.query.id as string;
  const data = await getOriginBySortSelected(originCategoryId);

  res.json(data);
}
