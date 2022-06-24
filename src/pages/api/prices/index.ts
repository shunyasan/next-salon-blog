import { NextApiRequest, NextApiResponse } from "next";
import { requestToOrderPlan } from "services/app/parameter/CreateParameterHooks";
import { PriceDto } from "types/PriceDto";
import { priceService } from "services/service";

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
