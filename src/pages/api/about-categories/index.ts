import { NextApiRequest, NextApiResponse } from "next";
import { IdAndNameRepository } from "services/orm/repository/IdAndNameRepository";
import { aboutCategoryService } from "services/service";
import { IdAndNameDto } from "types/IdAndNameDto";

const { getAllAboutCategoriesIdAndName } = IdAndNameRepository();

export default async function getAboutCategories(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>
): Promise<IdAndNameDto[]> {
  const originCategoryId = req.query.originCategoryId as string;
  const aboutCategoryId = (req.query.aboutCategoryId as string) || "";
  const data = await getAllAboutCategoriesIdAndName(
    originCategoryId,
    aboutCategoryId
  );

  // const url =
  //   "about-category/id-and-name/sort-selected?" +
  //   `originCategoryId=${originCategoryId}&`;

  // const checkedUrl =
  //   !aboutCategoryId || aboutCategoryId === "none"
  //     ? url
  //     : url + `aboutCategoryId=${aboutCategoryId}`;

  // const data: IdAndNameDto[] = await getAxios(checkedUrl);
  res.json(data);
  return data;
}
