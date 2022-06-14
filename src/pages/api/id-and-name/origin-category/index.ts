import { NextApiRequest, NextApiResponse } from "next";
import { IdAndNameService } from "services/orm/id-and-name/get";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";

export default async function getAllOriginCategoryIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>
) {
  const idAndNameService = new IdAndNameService();
  const data = await idAndNameService.getAllOriginCategory();

  // const data: IdAndNameDto[] = await getAxios(`id-and-name/origin-category`);
  res.json(data);
}
