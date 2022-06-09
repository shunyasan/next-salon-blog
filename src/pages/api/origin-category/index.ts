import { OriginCategory } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { OriginCategoryService } from "services/orm/origin-category/get";

export default async function getAllOriginCategory(
  req: NextApiRequest,
  res: NextApiResponse<OriginCategory[]>
) {
  const originCategoryService = new OriginCategoryService();
  const data = await originCategoryService.getAllOriginCategory();

  // const data: OriginCategory[] = await getAxios("origin-category");
  res.json(data);
}
