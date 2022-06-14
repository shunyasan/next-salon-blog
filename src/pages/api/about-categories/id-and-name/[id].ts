import { NextApiRequest, NextApiResponse } from "next";
import { AboutCategoryService } from "services/orm/about-categories/get";
import { AboutCategory } from "types/api/AboutCategory";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";

export default async function getAboutCategoryIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto>
): Promise<IdAndNameDto> {
  const id = req.query.id as string;
  const aboutService = new AboutCategoryService();
  const data = await aboutService.getAboutCategoryIdAndName(id);
  // デフォルト
  // const data: IdAndNameDto = await getAxios("about-category/id-and-name/" + id);
  res.json(data);
  return data;
}
