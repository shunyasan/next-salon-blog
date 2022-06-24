import { NextApiRequest, NextApiResponse } from "next";
import { basePartsService } from "services/service";
import { IdAndNameDto } from "types/IdAndNameDto";

export default async function getBaseParts(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>

  // aboutCategoryId: string,
  // partsId?: string
) {
  const aboutCategoryId = req.query.aboutCategoryId as string;
  const partsId = req.query.partsId as string;
  const data = await basePartsService.getBySortSelected(
    aboutCategoryId,
    partsId
  );

  // const url =
  //   "base-parts/id-and-name/sort-selected?" +
  //   `aboutCategoryId=${aboutCategoryId}&`;

  // const checkedUrl =
  //   !partsId || partsId === "none" ? url : url + `partsId=${partsId}&`;

  // const data: IdAndNameDto[] = await getAxios(checkedUrl);
  res.json(data);
}
