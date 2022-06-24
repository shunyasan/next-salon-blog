// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { featureService } from "services/service";
import { FeatureDto } from "types/FeatureDto";

export default async function getAllFeature(
  req: NextApiRequest,
  res: NextApiResponse<FeatureDto>
) {
  const data: FeatureDto = await featureService.getAllFeature();
  // const data = await getAxios("feature");
  res.json(data);
}
