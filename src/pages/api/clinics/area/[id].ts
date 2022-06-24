import { NextApiRequest, NextApiResponse } from "next";
import { clinicService } from "services/service";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";

export default async function getAllClinicByAreaId(
  req: NextApiRequest,
  res: NextApiResponse<ClinicNestPriceDto[]>

  // areaId: string,
  // take: number,
  // skip: number
): Promise<ClinicNestPriceDto[]> {
  const areaId = req.query.id as string;
  const take = Number(req.query.take);
  const skip = Number(req.query.skip);
  const data = await clinicService.getAllClinicByAreaId(areaId, { take, skip });

  // const query = `take=${take}&skip=${skip}`;
  // const data: ClinicNestPriceDto[] = await getAxios(
  //   "clinic/clinic-nest-price/area/" + areaId + "/pagenation?" + query
  // );
  res.json(data);
  return data;
}
