import { NextApiRequest, NextApiResponse } from "next";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
import { getAxios } from "../../../services/api/get";

export default async function getOriginCategories(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>

  // originCategoryId: string
): Promise<IdAndNameDto[]> {
  const originCategoryId = req.query.id;

  const url =
    "origin-category/id-and-name/sort-selected?" +
    `originCategoryId=${originCategoryId}&`;

  const data: IdAndNameDto[] = await getAxios(url);
  res.json(data);
  return data;
}
