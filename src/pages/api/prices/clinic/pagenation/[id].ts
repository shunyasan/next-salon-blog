import { NextApiRequest, NextApiResponse } from "next";
import {
  checkEmptyRequestQueryToNumber,
  checkNumberRequestQuery,
} from "services/api/validation";
import { PagenationParameter } from "types/api/dto/PagenationParameterDto";
import { PriceDto } from "types/api/dto/PriceDto";
import { getAxios } from "../../../../../services/api/get";

export default async function getPriceByClinicId(
  req: NextApiRequest,
  res: NextApiResponse<PriceDto[]>

  // clinicId: string,
  // pagenation?: PagenationParameter
): Promise<PriceDto[]> {
  const clinicId = req.query.id;

  const takeCheck = checkEmptyRequestQueryToNumber(req.query.take);
  const skipCheck = checkEmptyRequestQueryToNumber(req.query.skip);

  const take = takeCheck ? `take=${takeCheck}&` : "";
  const skip = takeCheck ? `skip=${skipCheck}` : "";

  const data: PriceDto[] = await getAxios(
    `price/only-price/pagenation/clinic/${clinicId}?${take + skip}`
  );
  res.json(data);
  return data;
}
