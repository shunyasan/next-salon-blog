import { NextApiRequest, NextApiResponse } from "next";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
import { getAxios } from "../../../services/api/get";

export default async function getAboutCategories(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>
): Promise<IdAndNameDto[]> {
  const originCategoryId = req.query.originCategoryId;
  const aboutCategoryId = req.query.aboutCategoryId || "";

  const url =
    "about-category/id-and-name/sort-selected?" +
    `originCategoryId=${originCategoryId}&`;

  const checkedUrl =
    !aboutCategoryId || aboutCategoryId === "none"
      ? url
      : url + `aboutCategoryId=${aboutCategoryId}`;

  const data: IdAndNameDto[] = await getAxios(checkedUrl);
  res.json(data);
  return data;
}
