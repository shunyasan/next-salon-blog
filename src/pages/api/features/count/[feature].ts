import { NextApiRequest, NextApiResponse } from "next";
import { clinicNestPriceRepository } from "services/repository/clinicNestPriceRepository";

const { getCountFeature } = clinicNestPriceRepository();

export default async function getCountFeatureDto(
  req: NextApiRequest,
  res: NextApiResponse<number>

  // feature: string
) {
  const feature = req.query.feature as string;

  const data = await getCountFeature(feature);

  // const data: number = await getAxios(`feature/count/${feature}`);
  res.json(data);
}
