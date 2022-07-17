import { OriginCategory } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { originCategoryRepository } from "services/common/repository";

export default async function getAllOriginCategory(
  req: NextApiRequest,
  res: NextApiResponse<OriginCategory[]>
) {
  const data = await originCategoryRepository.getAllOriginCategory();

  // const data: OriginCategory[] = await getAxios("origin-category");
  res.json(data);
}
