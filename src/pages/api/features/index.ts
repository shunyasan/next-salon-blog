// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { FeatureDto } from "types/api/dto/FeatureDto";
import { getAxios } from "../../../services/api/get";

export default async function getAllFeature(
  req: NextApiRequest,
  res: NextApiResponse<FeatureDto>
) {
  const data = await getAxios("feature");
  res.json(data);
  return data;
}
