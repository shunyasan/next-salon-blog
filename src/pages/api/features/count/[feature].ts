import { NextApiRequest, NextApiResponse } from "next";
import { featureValidation } from "services/app/features/feature";
import { FeatureService } from "services/orm/features/get";

export default async function getCountFeature(
  req: NextApiRequest,
  res: NextApiResponse<number>

  // feature: string
) {
  const feature = req.query.feature as string;

  const check =
    typeof feature === "string" ? featureValidation(feature) : undefined;
  if (!check) {
    throw new Error("featureがありません");
  }
  const featureService = new FeatureService();
  const data = await featureService.getCountFeature(feature);

  // const data: number = await getAxios(`feature/count/${feature}`);
  res.json(data);
}
