// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { FeatureService } from "services/orm/features/get";
import { FeatureDto } from "types/api/dto/FeatureDto";

export default async function getAllFeature(
  req: NextApiRequest,
  res: NextApiResponse<FeatureDto>
) {
  const feature = new FeatureService();
  const data: FeatureDto = await feature.getAllFeature();
  // const data = await getAxios("feature");
  res.json(data);
}
