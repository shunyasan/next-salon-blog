import { NextApiRequest, NextApiResponse } from "next";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
import { getAxios } from "../../../services/api/get";

export default async function getBaseParts(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>

  // aboutCategoryId: string,
  // partsId?: string
): Promise<IdAndNameDto[]> {
  const aboutCategoryId = req.query.aboutCategoryId;
  const partsId = req.query.partsId;

  const url =
    "base-parts/id-and-name/sort-selected?" +
    `aboutCategoryId=${aboutCategoryId}&`;

  const checkedUrl =
    !partsId || partsId === "none" ? url : url + `partsId=${partsId}&`;

  const data: IdAndNameDto[] = await getAxios(checkedUrl);
  res.json(data);
  return data;
}
