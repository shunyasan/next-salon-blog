// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { featureDtoRepository } from "services/repository/featureDtoRepository";
import { FeatureDto } from "types/FeatureDto";

const { getAllFeature } = featureDtoRepository();

export default async function getAllFeatureDto(
  req: NextApiRequest,
  res: NextApiResponse<FeatureDto>
) {
  const data: FeatureDto = await getAllFeature();
  // const data = await getAxios("feature");
  res.json(data);
}
