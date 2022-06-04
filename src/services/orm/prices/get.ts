import { NextApiRequest, NextApiResponse } from "next";
import {
  checkEmptyRequestQueryToNumber,
  checkRequestQueryToOrdarPlan,
} from "services/orm/validation";
import { createQueryString } from "services/app/parameter/CreateParameterHooks";
import { createQuery } from "services/app/prices/price";
import { IncludePartsAndCategoryPriceDto } from "types/api/dto/IncludePartsAndCategoryPriceDto";
import { PagenationParameter } from "types/api/dto/PagenationParameterDto";
import { PriceDto } from "types/api/dto/PriceDto";
import { OrderPlan } from "types/app/OrderPlan";
import { getAxios } from "../get";

export async function getPrice(
  orderPlan: OrderPlan,
  take: number,
  skip: number
): Promise<IncludePartsAndCategoryPriceDto> {
  const param = createQuery(orderPlan, take, skip);
  const data: IncludePartsAndCategoryPriceDto = await getAxios(
    "price/order-plan?" + param
  );
  return data;
}

export async function getPriceCount(orderPlan: OrderPlan): Promise<number> {
  const param = createQuery(orderPlan);
  const data: number = await getAxios("price/max-count?" + param);
  return data;
}

export async function getPriceByAboutIdAndClinicId(
  clinicId: string,
  aboutId: string
): Promise<PriceDto[]> {
  const data: PriceDto[] = await getAxios(
    `price/clinic/${clinicId}?aboutId=${aboutId}`
  );
  return data;
}

export async function getPriceByClinicId(
  clinicId: string,
  pagenation?: PagenationParameter
): Promise<PriceDto[]> {
  const take = pagenation?.take ? `take=${pagenation.take}&` : "";
  const skip = pagenation?.skip ? `skip=${pagenation.skip}` : "";

  const data: PriceDto[] = await getAxios(
    `price/only-price/pagenation/clinic/${clinicId}?${take + skip}`
  );
  return data;
}
