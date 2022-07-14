import { NextApiRequest, NextApiResponse } from "next";
import { PriceDto } from "types/PriceDto";
import { priceByAboutCategoryService, priceService } from "services/service";
import { PriceByAboutCategory } from "types/PriceByAboutCategory";

export default async function getTreatmentPrice(
  req: NextApiRequest,
  res: NextApiResponse<PriceByAboutCategory[]>
) {
  const originId = req.query.originId as string;
  const clinicId = req.query.clinicId as string;
  const gender = req.query.gender as string;
  const data = await priceByAboutCategoryService.getAllByClinic(
    originId,
    clinicId,
    gender
  );

  res.json(data);
}
