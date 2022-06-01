import { NextApiRequest, NextApiResponse } from "next";
import { getAxios } from "services/api/get";
import { AboutCategory } from "types/api/AboutCategory";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";

export default async function getAboutCategoryById(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto>
): Promise<IdAndNameDto> {
  const id = req.query.id;
  const data: IdAndNameDto = await getAxios("about-category/id-and-name/" + id);
  res.json(data);
  return data;
}
