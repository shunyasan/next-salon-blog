import { NextApiRequest, NextApiResponse } from "next";
import { featureValidation } from "services/app/features/feature";
import { featureService } from "services/service";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";

export default async function getFeature(
  req: NextApiRequest,
  res: NextApiResponse<ClinicNestPriceDto[]>

  // feature: string,
  // take: number,
  // skip: number
) {
  const feature = req.query.feature as string;
  const take = Number(req.query.take);
  const skip = Number(req.query.skip);

  const check =
    typeof feature === "string" ? featureValidation(feature) : undefined;
  if (!check) {
    throw new Error("featureがありません");
  }

  const data = await featureService.getFeature(feature, { take, skip });

  // const query = `take=${take}&skip=${skip}`;
  // const data: ClinicNestPriceDto[] = await getAxios(
  //   `feature/${feature}?` + query
  // );
  res.json(data);
}
