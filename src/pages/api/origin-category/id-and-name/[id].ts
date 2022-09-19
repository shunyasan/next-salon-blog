import { NextApiRequest, NextApiResponse } from "next";
import { originCategoryRepository } from "services/common/repository";
import { IdAndNameDto } from "types/IdAndNameDto";

export default async function getOriginCategoryIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto>
) {
  const id = req.query.id as string;
  const data = await originCategoryRepository.getIdAndName(id);

  res.json(data);
}
