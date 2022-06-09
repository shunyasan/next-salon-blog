import { NextApiRequest, NextApiResponse } from "next";
import { PriceService } from "services/orm/prices/get";
import { PriceDto } from "types/api/dto/PriceDto";

export default async function getPriceByAboutIdAndClinicId(
  req: NextApiRequest,
  res: NextApiResponse<PriceDto[]>

  // clinicId: string,
  // aboutId: string
) {
  const clinicId = req.query.id as string;
  const aboutId = req.query.aboutId as string;
  const priceService = new PriceService();
  const data = await priceService.getPriceByClinic(clinicId, aboutId);

  // const data: PriceDto[] = await getAxios(
  //   `price/clinic/${clinicId}?aboutId=${aboutId}`
  // );
  res.json(data);
}
