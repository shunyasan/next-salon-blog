import { NextApiRequest, NextApiResponse } from "next";
import { OriginCategory } from "types/api/OriginCategory";
import { getAxios } from "../../../services/orm/get";

export default async function getAllOriginCategory(
  req: NextApiRequest,
  res: NextApiResponse<OriginCategory[]>
): Promise<OriginCategory[]> {
  const data: OriginCategory[] = await getAxios("origin-category");
  res.json(data);
  return data;
}
