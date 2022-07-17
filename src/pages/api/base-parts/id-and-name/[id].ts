import { NextApiRequest, NextApiResponse } from "next";
import { basePartsRepository } from "services/common/repository";
import { IdAndNameDto } from "types/IdAndNameDto";

export default async function getBasePartsIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto>
): Promise<IdAndNameDto> {
  const id = req.query.id as string;
  const data = await basePartsRepository.getIdAndName(id);

  // const data: IdAndNameDto = await getAxios("base-parts/id-and-name/" + id);
  res.json(data);
  return data;
}
