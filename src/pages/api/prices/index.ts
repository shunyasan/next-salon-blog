import { NextApiRequest, NextApiResponse } from "next";
import { PriceDto } from "types/PriceDto";
import { orderPlanQueryService, priceService } from "services/service";

export default async function getTreatmentPrice(
  req: NextApiRequest,
  res: NextApiResponse<PriceDto[]>
) {
  const take = Number(req.query.take);
  const skip = Number(req.query.skip);
  const orderPlanParam = orderPlanQueryService.getOrderPlanQuery(req.query);
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
