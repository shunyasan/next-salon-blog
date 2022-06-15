import { OrderPlan } from "types/app/OrderPlan";

const isExistQueryData = (key: string, data?: string | number) => {
  if (data && data !== "未選択" && data !== "none") {
    return `${key}=${data}&`;
  } else {
    return "";
  }
};

const checkNumber = (number?: number): boolean => {
  if (!number) {
    if (number === 0) {
      return true;
    }
    return false;
  } else {
    return true;
  }
};

export const createQuery = (
  orderPlan: OrderPlan,
  take?: number,
  skip?: number
) => {
  const gender = `gender=${orderPlan.gender}&`;
  const paySystem = `paySystem=${orderPlan.paySystem}&`;
  const originCategoryId = `originParts=${orderPlan.originParts}&`;
  const aboutCategoryId = `AboutCategory=${orderPlan.AboutCategory}&`;
  const partsId = isExistQueryData("parts", orderPlan.parts);
  const skinCollor = isExistQueryData("skinCollor", orderPlan.skinCollor);
  const hair = isExistQueryData("hair", orderPlan.hair);
  const roomType = isExistQueryData("roomType", orderPlan.roomType);
  const interior = isExistQueryData("interior", orderPlan.interior);
  const staff = isExistQueryData("staff", orderPlan.staff);
  const card = isExistQueryData("card", orderPlan.card);
  const loan = isExistQueryData("loan", orderPlan.loan);
  const contract = isExistQueryData("contract", orderPlan.contract);
  const option = isExistQueryData("option", orderPlan.option);

  const pagenation =
    checkNumber(take) && checkNumber(skip) ? `take=${take}&skip=${skip}` : "";

  const param =
    gender +
    paySystem +
    originCategoryId +
    aboutCategoryId +
    partsId +
    skinCollor +
    hair +
    roomType +
    interior +
    staff +
    card +
    loan +
    contract +
    option +
    pagenation;

  return param;
};
