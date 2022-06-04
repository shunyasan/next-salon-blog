import { NextApiRequest, NextApiResponse } from "next";
import { getAxios } from "services/orm/get";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";

export default async function getOriginCategoryIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto>
): Promise<IdAndNameDto> {
  const id = req.query.id;
  const data: IdAndNameDto = await getAxios(
    "origin-category/id-and-name/" + id
  );
  res.json(data);
  return data;
}
