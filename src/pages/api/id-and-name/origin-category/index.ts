import { NextApiRequest, NextApiResponse } from "next";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
import { getAxios } from "../../../../services/orm/get";

export default async function getAllOriginCategoryIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>
): Promise<IdAndNameDto[]> {
  const data: IdAndNameDto[] = await getAxios(`id-and-name/origin-category`);
  res.json(data);
  return data;
}
