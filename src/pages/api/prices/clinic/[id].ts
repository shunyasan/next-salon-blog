import { NextApiRequest, NextApiResponse } from "next";
import { PriceDto } from "types/api/dto/PriceDto";
import { getAxios } from "../../../../services/api/get";

export default async function getPriceByAboutIdAndClinicId(
  req: NextApiRequest,
  res: NextApiResponse<PriceDto[]>

  // clinicId: string,
  // aboutId: string
): Promise<PriceDto[]> {
  const clinicId = req.query.id;
  const aboutId = req.query.aboutId;

  const data: PriceDto[] = await getAxios(
    `price/clinic/${clinicId}?aboutId=${aboutId}`
  );
  res.json(data);

  return data;
}
