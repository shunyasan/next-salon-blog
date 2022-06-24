import { NextApiRequest, NextApiResponse } from "next";
import { clinicService } from "services/service";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";

export default async function getAllClinic(
  req: NextApiRequest,
  res: NextApiResponse<ClinicNestPriceDto[]>
  // take: number,
  // skip: number
): Promise<ClinicNestPriceDto[]> {
  const take = Number(req.query.take);
  const skip = Number(req.query.skip);
  const data = await clinicService.getAllClinicAndLimit({ take, skip });

  // const query = `take=${take}&skip=${skip}`;
  // const data: ClinicNestPriceDto[] = await getAxios(
  //   "clinic/clinic-nest-price/pagenation?" + query
  // );
  res.json(data);
  return data;
}
