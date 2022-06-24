import { NextApiRequest, NextApiResponse } from "next";
import { aboutCategoryService } from "services/service";
import { IdAndNameDto } from "types/IdAndNameDto";

export default async function getAboutCategoryIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto>
): Promise<IdAndNameDto> {
  const id = req.query.id as string;
  const data = await aboutCategoryService.getAboutCategoryIdAndName(id);
  // デフォルト
  // const data: IdAndNameDto = await getAxios("about-category/id-and-name/" + id);
  res.json(data);
  return data;
}
