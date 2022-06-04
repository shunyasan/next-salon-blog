import { NextApiRequest, NextApiResponse } from "next";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
import { getAxios } from "../../../../services/orm/get";

export default async function getAllBasePartsIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>
): Promise<IdAndNameDto[]> {
  const aboutCategoryId = req.query.aboutCategoryId;
  const data: IdAndNameDto[] = await getAxios(
    "base-parts/id-and-name/aboutCategoryId/" + aboutCategoryId
  );
  res.json(data);
  return data;
}
