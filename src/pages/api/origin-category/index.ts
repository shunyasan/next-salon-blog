import { OriginCategory } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { originCategoryService } from "services/service";

export default async function getAllOriginCategory(
  req: NextApiRequest,
  res: NextApiResponse<OriginCategory[]>
) {
  const data = await originCategoryService.getAllOriginCategory();

  // const data: OriginCategory[] = await getAxios("origin-category");
  res.json(data);
}
