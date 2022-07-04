import { NextApiRequest } from "next";
import { OrderPlanQuery } from "types/app/OrderPlanQuery";

export const checkRequestQuery = (query: string | string[]) => {
  if (typeof query === "string") {
    return query;
    // return encodeURI(query);
  } else {
    return "";
  }
};

export const checkNumberRequestQuery = (query: string | string[]) => {
  const number = query ? Number(query) : undefined;
  if (typeof number === "number") {
    return number;
  } else {
    return 0;
  }
};

export const checkEmptyRequestQueryToNumber = (query: string | string[]) => {
  const data = checkRequestQuery(query);
  if (data === "") {
    return undefined;
  }
  return Number(data);
};

export const checkRequestQueryToOrdarPlan = (req: NextApiRequest) => {
  const orderPlan: OrderPlanQuery = {
    gender: checkRequestQuery(req.query.gender),
    paySystem: checkRequestQuery(req.query.paySystem),
    originParts: checkRequestQuery(req.query.originParts),
    aboutCategory: checkRequestQuery(req.query.aboutCategory),
    parts: checkRequestQuery(req.query.parts),
    skinCollor: checkRequestQuery(req.query.skinCollor),
    hair: checkRequestQuery(req.query.hair),
    roomType: checkRequestQuery(req.query.roomType),
    interior: checkRequestQuery(req.query.interior),
    staff: checkRequestQuery(req.query.staff),
    card: checkRequestQuery(req.query.card),
    loan: checkRequestQuery(req.query.loan),
    contract: checkRequestQuery(req.query.contract),
    option: checkRequestQuery(req.query.option),
    sort: checkRequestQuery(req.query.sort),
  };
  return orderPlan;
};
