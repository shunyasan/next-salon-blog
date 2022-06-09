import { NextApiRequest, NextApiResponse } from "next";
import { AboutCategoryService } from "services/orm/about-categories/get";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";

export default async function getAboutCategories(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>
): Promise<IdAndNameDto[]> {
  const originCategoryId = req.query.originCategoryId as string;
  const aboutCategoryId = (req.query.aboutCategoryId as string) || "";
  const aboutService = new AboutCategoryService();
  const data = await aboutService.getAllAboutCategoriesIdAndName(
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
