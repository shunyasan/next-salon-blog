import { NextApiRequest, NextApiResponse } from "next";
import { OriginCategoryService } from "services/orm/origin-category/get";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";

export default async function getOriginCategories(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>

  // originCategoryId: string
) {
  const originCategoryId = req.query.id as string;
  const originCategoryService = new OriginCategoryService();
  const data = await originCategoryService.getBySortSelected(originCategoryId);

  // const url =
  //   "origin-category/id-and-name/sort-selected?" +
  //   `originCategoryId=${originCategoryId}&`;

  // const data: IdAndNameDto[] = await getAxios(url);
  res.json(data);
}
