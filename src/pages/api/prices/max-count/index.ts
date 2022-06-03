import { NextApiRequest, NextApiResponse } from "next";
import {
  checkNumberRequestQuery,
  checkRequestQuery,
  checkRequestQueryToOrdarPlan,
} from "services/api/validation";
import { createQueryString } from "services/app/parameter/CreateParameterHooks";
import { createQuery } from "services/app/prices/price";
import { OrderPlan } from "types/app/OrderPlan";
import { getAxios } from "../../../../services/api/get";

export default async function getCountPrice(
  req: NextApiRequest,
  res: NextApiResponse<number>

  // orderPlan: OrderPlan
): Promise<number> {
  const param = createQueryString(req.query);
  const data: number = await getAxios("price/max-count?" + param);
  res.json(data);
  return data;
}
