import { NextApiRequest, NextApiResponse } from "next";
import { originCategoryService } from "services/service";
import { IdAndNameDto } from "types/IdAndNameDto";

export default async function getOriginCategoryIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto>
) {
  const id = req.query.id as string;
  const data = await originCategoryService.getOriginCategoryIdAndName(id);

  // const data: IdAndNameDto = await getAxios(
  //   "origin-category/id-and-name/" + id
  // );
  res.json(data);
}
