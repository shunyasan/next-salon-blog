import { NextApiRequest, NextApiResponse } from "next";
import {
  checkNumberRequestQuery,
  checkRequestQuery,
  checkRequestQueryToOrdarPlan,
} from "services/validation";
import { orderPlanQueryService, priceService } from "services/service";

export default async function getCountPrice(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const orderPlanParam = orderPlanQueryService.getOrderPlanQuery(req.query);
  const data = await priceService.getCountMaxPlan(orderPlanParam);

  // const param = createQueryString(req.query);
  // const data: number = await getAxios("price/max-count?" + param);
  res.json(data);
}
