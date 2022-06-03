import { NextApiRequest, NextApiResponse } from "next";
import {
  checkEmptyRequestQueryToNumber,
  checkRequestQueryToOrdarPlan,
} from "services/api/validation";
import { createQueryString } from "services/app/parameter/CreateParameterHooks";
import { createQuery } from "services/app/prices/price";
import { IncludePartsAndCategoryPriceDto } from "types/api/dto/IncludePartsAndCategoryPriceDto";
import { OrderPlan } from "types/app/OrderPlan";
import { getAxios } from "../../../services/api/get";

export default async function getTreatmentPrice(
  req: NextApiRequest,
  res: NextApiResponse<IncludePartsAndCategoryPriceDto>

  // orderPlan: OrderPlan,
  // take: number,
  // skip: number
): Promise<IncludePartsAndCategoryPriceDto> {
  const param = createQueryString(req.query);
  const data: IncludePartsAndCategoryPriceDto = await getAxios(
    "price/order-plan?" + param
  );
  res.json(data);
  return data;
}
