import { NextApiRequest, NextApiResponse } from "next";
import { priceDtoRepository } from "services/repository/priceDtoRepository";
import { PriceDto } from "types/PriceDto";

const { getPriceByClinic } = priceDtoRepository();

export default async function getPriceByAboutIdAndClinicId(
  req: NextApiRequest,
  res: NextApiResponse<PriceDto[]>

  // clinicId: string,
  // aboutId: string
) {
  const clinicId = req.query.id as string;
  const aboutId = req.query.aboutId as string;
  const data = await getPriceByClinic(clinicId, aboutId);

  // const data: PriceDto[] = await getAxios(
  //   `price/clinic/${clinicId}?aboutId=${aboutId}`
  // );
  res.json(data);
}
