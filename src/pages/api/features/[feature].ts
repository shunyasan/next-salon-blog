import { NextApiRequest, NextApiResponse } from "next";
import { featureValidation } from "services/features/feature";
import { createQueryString } from "services/parameter/CreateParameterHooks";
import { ClinicNestPriceDto } from "types/api/dto/ClinicNestPriceDto";
import { getAxios } from "../../../services/api/get";

export default async function getFeature(
  req: NextApiRequest,
  res: NextApiResponse<ClinicNestPriceDto[]>

  // feature: string,
  // take: number,
  // skip: number
): Promise<ClinicNestPriceDto[]> {
  const feature = req.query.feature;
  const take = req.query.take;
  const skip = req.query.skip;

  const param = createQueryString(req.query);

  const check =
    typeof feature === "string" ? featureValidation(feature) : undefined;
  if (!check) {
    throw new Error("featureがありません");
  }

  const query = `take=${take}&skip=${skip}`;
  const data: ClinicNestPriceDto[] = await getAxios(
    `feature/${feature}?` + query
  );
  res.json(data);
  return data;
}
