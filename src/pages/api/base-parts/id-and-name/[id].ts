import { NextApiRequest, NextApiResponse } from "next";
import { BasePartsService } from "services/orm/base-parts/get";
import { AboutCategory } from "types/api/AboutCategory";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";

export default async function getBasePartsIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto>
): Promise<IdAndNameDto> {
  const id = req.query.id as string;
  const basePartsService = new BasePartsService();
  const data = await basePartsService.getBasePartsIdAndName(id);

  // const data: IdAndNameDto = await getAxios("base-parts/id-and-name/" + id);
  res.json(data);
  return data;
}
