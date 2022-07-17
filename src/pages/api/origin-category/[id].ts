import { NextApiRequest, NextApiResponse } from "next";
import { IdAndNameRepository } from "services/repository/IdAndNameRepository";
import { IdAndNameDto } from "types/IdAndNameDto";

const { getOriginBySortSelected } = IdAndNameRepository();
export default async function getOriginCategories(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>

  // originCategoryId: string
) {
  const originCategoryId = req.query.id as string;
  const data = await getOriginBySortSelected(originCategoryId);

  // const url =
  //   "origin-category/id-and-name/sort-selected?" +
  //   `originCategoryId=${originCategoryId}&`;

  // const data: IdAndNameDto[] = await getAxios(url);
  res.json(data);
}
