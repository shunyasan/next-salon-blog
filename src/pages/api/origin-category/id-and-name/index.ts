import { NextApiRequest, NextApiResponse } from "next";
import { IdAndNameRepository } from "services/repository/IdAndNameRepository";
import { originCategoryRepository } from "services/common/repository";
import { IdAndNameDto } from "types/IdAndNameDto";

export default async function getAllOriginCategoryIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>
) {
  const data = await originCategoryRepository.getAllIdAndName();

  res.json(data);
}
