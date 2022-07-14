import { NextApiRequest, NextApiResponse } from "next";
import { priceService } from "services/service";
import { OrderPlanQueryService } from "services/app/orderPlanQueryService";

const { getOrderPlanQuery } = OrderPlanQueryService();

export default async function getCountPrice(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const orderPlanParam = getOrderPlanQuery(req.query);
  const data = await priceService.getCountMaxPlan(orderPlanParam);

  // const param = createQueryString(req.query);
  // const data: number = await getAxios("price/max-count?" + param);
  res.json(data);
}
