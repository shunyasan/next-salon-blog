import { NextApiRequest, NextApiResponse } from "next";
import {
  checkNumberRequestQuery,
  checkRequestQuery,
  checkRequestQueryToOrdarPlan,
} from "services/orm/validation";
import {
  createQueryString,
  requestToOrderPlan,
} from "services/app/parameter/CreateParameterHooks";
import { PriceService } from "services/orm/prices/get";

export default async function getCountPrice(
  req: NextApiRequest,
  res: NextApiResponse<number>

  // orderPlan: OrderPlan
) {
  const orderPlanParam = requestToOrderPlan(req);
  const priceService = new PriceService();
  const data = await priceService.getCountMaxPlan(orderPlanParam);

  // const param = createQueryString(req.query);
  // const data: number = await getAxios("price/max-count?" + param);
  res.json(data);
}
