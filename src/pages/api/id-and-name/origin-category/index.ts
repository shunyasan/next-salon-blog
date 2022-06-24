import { NextApiRequest, NextApiResponse } from "next";
import { idAndNameService } from "services/service";
import { IdAndNameDto } from "types/IdAndNameDto";

export default async function getAllOriginCategoryIdAndName(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>
) {
  const data = await idAndNameService.getAllOriginCategory();

  // const data: IdAndNameDto[] = await getAxios(`id-and-name/origin-category`);
  res.json(data);
}
