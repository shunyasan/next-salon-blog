import { NextApiRequest, NextApiResponse } from "next";
import { ClinicNestPriceDto } from "types/api/dto/ClinicNestPriceDto";
import { getAxios } from "../../../../services/api/get";

export default async function getAllClinic(
  req: NextApiRequest,
  res: NextApiResponse<ClinicNestPriceDto[]>
  // take: number,
  // skip: number
): Promise<ClinicNestPriceDto[]> {
  const take = req.query.take;
  const skip = req.query.skip;

  const query = `take=${take}&skip=${skip}`;
  const data: ClinicNestPriceDto[] = await getAxios(
    "clinic/clinic-nest-price/pagenation?" + query
  );
  res.json(data);
  return data;
}
