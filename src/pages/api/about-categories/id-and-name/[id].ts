import { NextApiRequest, NextApiResponse } from "next";
import { aboutCategoryRepository } from "services/common/repository";
import { IdAndNameDto } from "types/IdAndNameDto";

export default async function getAboutCategoryIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto>
): Promise<IdAndNameDto> {
  const id = req.query.id as string;
  const data = await aboutCategoryRepository.getIdAndName(id);
  // デフォルト
  // const data: IdAndNameDto = await getAxios("about-category/id-and-name/" + id);
  res.json(data);
  return data;
}
