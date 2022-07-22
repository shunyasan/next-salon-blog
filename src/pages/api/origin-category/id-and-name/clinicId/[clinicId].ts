import { NextApiRequest, NextApiResponse } from "next";
import { originCategoryRepository } from "services/common/repository";
import { IdAndNameDto } from "types/IdAndNameDto";

export default async function getOriginCategoryIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>
) {
  const clinicId = req.query.clinicId as string;
  const data = await originCategoryRepository.getIdAndNameByClinicId(clinicId);

  res.json(data);
}
