import { NextApiRequest, NextApiResponse } from "next";
import {
  checkEmptyRequestQueryToNumber,
  checkRequestQueryToOrdarPlan,
} from "services/orm/validation";
import {
  createQueryString,
  requestToOrderPlan,
} from "services/app/parameter/CreateParameterHooks";
import { createQuery } from "services/app/prices/price";
import { IncludePartsAndCategoryPriceDto } from "types/api/dto/IncludePartsAndCategoryPriceDto";
import { OrderPlan } from "types/app/OrderPlan";
import { PriceService } from "services/orm/prices/get";
import { PriceDto } from "types/api/dto/PriceDto";

export default async function getTreatmentPrice(
  req: NextApiRequest,
  res: NextApiResponse<PriceDto[]>

  // orderPlan: OrderPlan,
  // take: number,
  // skip: number
) {
  const take = Number(req.query.take);
  const skip = Number(req.query.skip);
  const orderPlanParam = requestToOrderPlan(req);
  const priceService = new PriceService();
  const data = await priceService.getPriceOrderPlan(orderPlanParam, {
    take,
    skip,
  });

  // const param = createQueryString(req.query);
  // const data: IncludePartsAndCategoryPriceDto = await getAxios(
  //   "price/order-plan?" + param
  // );
  res.json(data);
}
