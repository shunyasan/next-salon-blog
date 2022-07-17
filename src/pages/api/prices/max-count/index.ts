import { NextApiRequest, NextApiResponse } from "next";
import { OrderPlanQueryService } from "services/orderPlanQueryService";
import { priceDtoRepository } from "services/repository/priceDtoRepository";

const { getOrderPlanQuery } = OrderPlanQueryService();
const { getCountMaxPlan } = priceDtoRepository();

export default async function getCountPrice(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const orderPlanParam = getOrderPlanQuery(req.query);
  const data = await getCountMaxPlan(orderPlanParam);

  // const param = createQueryString(req.query);
  // const data: number = await getAxios("price/max-count?" + param);
  res.json(data);
}
