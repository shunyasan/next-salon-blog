import { NextApiRequest, NextApiResponse } from "next";
import { PriceDto } from "types/PriceDto";
import { priceService } from "services/service";
import { OrderPlanQueryService } from "services/app/orderPlanQueryService";

const { getOrderPlanQuery } = OrderPlanQueryService();

export default async function getTreatmentPrice(
  req: NextApiRequest,
  res: NextApiResponse<PriceDto[]>
) {
  const take = Number(req.query.take);
  const skip = Number(req.query.skip);
  const orderPlanParam = getOrderPlanQuery(req.query);
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
