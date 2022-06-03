import { QueryKey } from "enums/QueryKey";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { OrderPlan } from "types/app/OrderPlan";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { QueryOrderPlan } from "types/app/QueryOrderPlan";
export const getQueryOrderPlan = (url: string) => {
  const decode = decodeURI(url);
  const query = new URLSearchParams(decode);
  const orderPlanViewCard: QueryOrderPlan = {
    gender: query.get(QueryKey.gender),
    skinCollor: query.get(QueryKey.skinCollor),
    hair: query.get(QueryKey.hair),
    paySystem: query.get(QueryKey.paySystem),
    originParts: query.get(QueryKey.originParts),
    AboutCategory: query.get(QueryKey.aboutCategory),
    parts: query.get(QueryKey.parts),
    roomType: query.get(QueryKey.roomType),
    interior: query.get(QueryKey.interior),
    staff: Number(query.get(QueryKey.staff)),
    card: query.get(QueryKey.card),
    loan: query.get(QueryKey.loan),
    contract: query.get(QueryKey.contract),
    option: query.get(QueryKey.option),
  };
  return orderPlanViewCard;
};

/**
 * 上のメソッドと同じにする予定
 * 型が分かれているが、上の関数からnullを外して対応
 */
export const getQueryOrderPlanInSearch = (url: string) => {
  const decode = decodeURI(url);
  const query = new URLSearchParams(decode);
  const orderParams: OrderPlan = {
    gender: query.get(QueryKey.gender) || "女性",
    paySystem: query.get(QueryKey.paySystem) || "総額",
    originParts: query.get(QueryKey.originParts) || "Z000001",
    AboutCategory: query.get(QueryKey.aboutCategory) || "A000001",
    parts: query.get(QueryKey.parts) || "未選択",
    skinCollor: query.get(QueryKey.skinCollor) || "薄茶色",
    hair: query.get(QueryKey.hair) || "標準",
    roomType: query.get(QueryKey.roomType) || "none",
    interior: query.get(QueryKey.interior) || "none",
    staff: Number(query.get(QueryKey.gender)) || 0,
    card: query.get(QueryKey.card) || "none",
    loan: query.get(QueryKey.loan) || "none",
    contract: query.get(QueryKey.contract) || "none",
    option: query.get(QueryKey.option) || "none",
  };
  return orderParams;
};

const checkParam = (key: string, value: string) => {
  if (!key || key === "none") {
    return "";
  } else {
    return `${key}=${value}&`;
  }
};

export const createParameter = (orderData: OrderPlanIdName) => {
  let newParams: string = "";
  newParams += checkParam(QueryKey.gender, orderData.gender.id);
  newParams += checkParam(QueryKey.paySystem, orderData.paySystem.id);
  newParams += checkParam(QueryKey.originParts, orderData.originParts.id);
  newParams += checkParam(QueryKey.aboutCategory, orderData.AboutCategory.id);
  newParams += checkParam(QueryKey.parts, orderData.parts.id);
  newParams += checkParam(QueryKey.skinCollor, orderData.skinCollor.id);
  newParams += checkParam(QueryKey.hair, orderData.hair.id);
  newParams += checkParam(QueryKey.roomType, orderData.roomType.id);
  newParams += checkParam(QueryKey.interior, orderData.interior.id);
  newParams += checkParam(QueryKey.staff, orderData.staff.id);
  newParams += checkParam(QueryKey.card, orderData.card.id);
  newParams += checkParam(QueryKey.loan, orderData.loan.id);
  newParams += checkParam(QueryKey.contract, orderData.contract.id);
  newParams += checkParam(QueryKey.option, orderData.option.id);
  return newParams;
};

export const createQueryString = (query: ParsedUrlQuery) => {
  if (!query || !Object.keys(query).length) {
    return "";
  }
  const changed = Object.entries(query).map(([key, val]) => `${key}=${val}&`);
  const queryToString = changed.reduce((a, b) => a + b);
  return queryToString;
};

export const searchForPlan = (
  gender: string,
  originId: string,
  aboutCategoryId: string,
  partsId?: string
) => {
  const genderParam = `${QueryKey.gender}=${gender}&`;
  const originCategory = `${QueryKey.originParts}=${originId}&`;
  const aboutCategory = `${QueryKey.aboutCategory}=${aboutCategoryId}&`;
  const parts = partsId ? `${QueryKey.parts}=${partsId}&` : "";
  const param = genderParam + originCategory + aboutCategory + parts;
  return param;
};