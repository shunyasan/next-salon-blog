import { QueryKey } from "enums/QueryKey";
import { NextApiRequest } from "next";
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

const checkNone = (value: string) => {
  if (value && value !== "") {
    if (value !== "none") {
      return value;
    }
  }
};

const checkGender = (value: number | string) => {
  switch (value) {
    case 1:
      return "女性";
    case 2:
      return "男性";
    case 0:
      return "未指定";
    default:
      return value;
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

//削除予定
export const requestToOrderPlan = (req: NextApiRequest): OrderPlan => {
  const orderPlan: OrderPlan = {
    originParts: req.query.originParts as string,
    AboutCategory: req.query.AboutCategory as string,
    gender: checkNone(req.query.gender as string) || "",
    paySystem: checkNone(req.query.paySystem as string) || "",
    parts: checkNone(req.query.parts as string) || "",
    skinCollor: checkNone(req.query.skinCollor as string) || "",
    hair: checkNone(req.query.hair as string) || "",
    roomType: checkNone(req.query.roomType as string) || "",
    interior: checkNone(req.query.interior as string) || "",
    staff: Number(req.query.staff),
    card: checkNone(req.query.card as string) || "",
    loan: checkNone(req.query.loan as string) || "",
    contract: checkNone(req.query.contract as string) || "",
    option: checkNone(req.query.option as string) || "",
  };
  return orderPlan;
};

//削除予定
export const OrderPlanToOrderPlan = (orderParams: OrderPlan): OrderPlan => {
  const orderPlan: OrderPlan = {
    originParts: orderParams.originParts as string,
    AboutCategory: orderParams.AboutCategory as string,
    gender: checkNone(orderParams.gender as string) || "",
    paySystem: checkNone(orderParams.paySystem as string) || "",
    parts: checkNone(orderParams.parts as string) || "",
    skinCollor: checkNone(orderParams.skinCollor as string) || "",
    hair: checkNone(orderParams.hair as string) || "",
    roomType: checkNone(orderParams.roomType as string) || "",
    interior: checkNone(orderParams.interior as string) || "",
    staff: Number(orderParams.staff),
    card: checkNone(orderParams.card as string) || "",
    loan: checkNone(orderParams.loan as string) || "",
    contract: checkNone(orderParams.contract as string) || "",
    option: checkNone(orderParams.option as string) || "",
  };
  return orderPlan;
};
