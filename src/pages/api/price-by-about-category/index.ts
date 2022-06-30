import { NextApiRequest, NextApiResponse } from "next";
import { requestToOrderPlan } from "services/app/parameter/CreateParameterHooks";
import { PriceDto } from "types/PriceDto";
import { priceByAboutCategoryService, priceService } from "services/service";
import { PriceByAboutCategory } from "types/PriceByAboutCategory";

export default async function getTreatmentPrice(
  req: NextApiRequest,
  res: NextApiResponse<PriceByAboutCategory[]>
) {
  const originId = req.query.originId as string;
  const clinicId = req.query.clinicId as string;
  const data = await priceByAboutCategoryService.getAllByClinic(
    originId,
    clinicId
  );

  res.json(data);
}
