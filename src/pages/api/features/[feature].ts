import { NextApiRequest, NextApiResponse } from "next";
import { clinicNestPriceRepository } from "services/repository/clinicNestPriceRepository";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";

const { getFeature } = clinicNestPriceRepository();

export default async function getFeatures(
  req: NextApiRequest,
  res: NextApiResponse<ClinicNestPriceDto[]>

  // feature: string,
  // take: number,
  // skip: number
) {
  const feature = req.query.feature as string;
  const take = Number(req.query.take);
  const skip = Number(req.query.skip);

  const data = await getFeature(feature, { take, skip });

  // const query = `take=${take}&skip=${skip}`;
  // const data: ClinicNestPriceDto[] = await getAxios(
  //   `feature/${feature}?` + query
  // );
  res.json(data);
}
