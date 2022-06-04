import { NextApiRequest, NextApiResponse } from "next";
import { featureValidation } from "services/app/features/feature";
import { getAxios } from "../../../../services/orm/get";

export default async function getCountFeature(
  req: NextApiRequest,
  res: NextApiResponse<number>

  // feature: string
): Promise<number> {
  const feature = req.query.feature;

  const check =
    typeof feature === "string" ? featureValidation(feature) : undefined;
  if (!check) {
    throw new Error("featureがありません");
  }
  const data: number = await getAxios(`feature/count/${feature}`);
  res.json(data);
  return data;
}
