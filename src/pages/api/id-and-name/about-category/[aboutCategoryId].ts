import { NextApiRequest, NextApiResponse } from "next";
import { BasePartsService } from "services/orm/base-parts/get";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";

export default async function getAllBasePartsIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>
) {
  const aboutCategoryId = req.query.aboutCategoryId as string;
  const basePartsService = new BasePartsService();
  const data = await basePartsService.getAllBasePartsIdAndName(aboutCategoryId);

  // const data: IdAndNameDto[] = await getAxios(
  //   "base-parts/id-and-name/aboutCategoryId/" + aboutCategoryId
  // );
  res.json(data);
}
