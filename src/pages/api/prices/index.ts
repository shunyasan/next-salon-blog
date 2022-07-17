import { NextApiRequest, NextApiResponse } from "next";
import { PriceDto } from "types/PriceDto";
import { OrderPlanQueryService } from "services/orderPlanQueryService";
import { priceDtoRepository } from "services/repository/priceDtoRepository";

const { getOrderPlanQuery } = OrderPlanQueryService();
const { getPriceOrderPlan } = priceDtoRepository();

export default async function getTreatmentPrice(
  req: NextApiRequest,
  res: NextApiResponse<PriceDto[]>
) {
  const take = Number(req.query.take);
  const skip = Number(req.query.skip);
  const orderPlanParam = getOrderPlanQuery(req.query);
  const data = await getPriceOrderPlan(orderPlanParam, {
    take,
    skip,
  });

  res.json(data);
}
