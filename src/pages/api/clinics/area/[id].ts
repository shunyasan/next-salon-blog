import { NextApiRequest, NextApiResponse } from "next";
import { ClinicNestPriceDto } from "types/api/dto/ClinicNestPriceDto";
import { getAxios } from "../../../../services/api/get";

export default async function getAllClinicByAreaId(
  req: NextApiRequest,
  res: NextApiResponse<ClinicNestPriceDto[]>

  // areaId: string,
  // take: number,
  // skip: number
): Promise<ClinicNestPriceDto[]> {
  const areaId = req.query.id;
  const take = req.query.take;
  const skip = req.query.skip;

  const query = `take=${take}&skip=${skip}`;
  const data: ClinicNestPriceDto[] = await getAxios(
    "clinic/clinic-nest-price/area/" + areaId + "/pagenation?" + query
  );
  res.json(data);
  return data;
}
