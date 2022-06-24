import { NextApiRequest, NextApiResponse } from "next";
import { basePartsService } from "services/service";
import { IdAndNameDto } from "types/IdAndNameDto";

export default async function getBasePartsIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto>
): Promise<IdAndNameDto> {
  const id = req.query.id as string;
  const data = await basePartsService.getBasePartsIdAndName(id);

  // const data: IdAndNameDto = await getAxios("base-parts/id-and-name/" + id);
  res.json(data);
  return data;
}
