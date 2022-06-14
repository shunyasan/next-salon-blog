import { NextApiRequest, NextApiResponse } from "next";
import { OriginCategoryService } from "services/orm/origin-category/get";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";

export default async function getOriginCategoryIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto>
) {
  const id = req.query.id as string;
  const originCategoryService = new OriginCategoryService();
  const data = await originCategoryService.getOriginCategoryIdAndName(id);

  // const data: IdAndNameDto = await getAxios(
  //   "origin-category/id-and-name/" + id
  // );
  res.json(data);
}
