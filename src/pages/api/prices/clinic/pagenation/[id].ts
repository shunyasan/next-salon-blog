import { NextApiRequest, NextApiResponse } from "next";
import { PriceService } from "services/orm/prices/get";
import {
  checkEmptyRequestQueryToNumber,
  checkNumberRequestQuery,
} from "services/orm/validation";
import { PagenationParameter } from "types/api/dto/PagenationParameterDto";
import { PriceDto } from "types/api/dto/PriceDto";

export default async function getPriceByClinicId(
  req: NextApiRequest,
  res: NextApiResponse<PriceDto[]>

  // clinicId: string,
  // pagenation?: PagenationParameter
) {
  const clinicId = req.query.id as string;

  let pagenation: { take: number; skip: number } | undefined;
  if (req.query.take !== "" && req.query.skip !== "") {
    pagenation = { take: Number(req.query.take), skip: Number(req.query.skip) };
  }
  const priceService = new PriceService();
  const data = await priceService.getPlanByClinicId(clinicId, pagenation);

  // const takeCheck = checkEmptyRequestQueryToNumber(req.query.take);
  // const skipCheck = checkEmptyRequestQueryToNumber(req.query.skip);
  // const take = takeCheck ? `take=${takeCheck}&` : "";
  // const skip = takeCheck ? `skip=${skipCheck}` : "";

  // const data: PriceDto[] = await getAxios(
  //   `price/only-price/pagenation/clinic/${clinicId}?${take + skip}`
  // );
  res.json(data);
}
