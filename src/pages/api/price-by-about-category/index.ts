import { NextApiRequest, NextApiResponse } from "next";
import { priceByAboutCategoryRepository } from "services/repository/priceByAboutCategoryRepository";
import { PriceByAboutCategory } from "types/PriceByAboutCategory";

const { getAllByClinic } = priceByAboutCategoryRepository();
export default async function getTreatmentPrice(
  req: NextApiRequest,
  res: NextApiResponse<PriceByAboutCategory[]>
) {
  const originId = req.query.originId as string;
  const clinicId = req.query.clinicId as string;
  const gender = req.query.gender as string;
  const data = await getAllByClinic(originId, clinicId, gender);

  res.json(data);
}
