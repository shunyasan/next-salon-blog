import { NextApiRequest, NextApiResponse } from "next";
import { priceService } from "services/service";
import { PriceDto } from "types/PriceDto";

export default async function getPriceByAboutIdAndClinicId(
  req: NextApiRequest,
  res: NextApiResponse<PriceDto[]>

  // clinicId: string,
  // aboutId: string
) {
  const clinicId = req.query.id as string;
  const aboutId = req.query.aboutId as string;
  const data = await priceService.getPriceByClinic(clinicId, aboutId);

  // const data: PriceDto[] = await getAxios(
  //   `price/clinic/${clinicId}?aboutId=${aboutId}`
  // );
  res.json(data);
}
