import { OrderPlan } from "types/app/OrderPlan";

const isExistQueryData = (data: string | number | null) => {
  if (data) {
    return data !== "未選択" && data !== "none" ? true : false;
  }
  return false;
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
  const partsId = orderPlan.parts ? `parts=${orderPlan.parts}&` : "";
  const skinCollor = isExistQueryData(orderPlan.skinCollor)
    ? `skinCollor=${orderPlan.skinCollor}&`
    : "";
  const hair = isExistQueryData(orderPlan.hair)
    ? `hair=${orderPlan.hair}&`
    : "";

  const roomType = isExistQueryData(orderPlan.roomType)
    ? `roomType=${orderPlan.roomType}&`
    : "";

  const interior = isExistQueryData(orderPlan.interior)
    ? `interior=${orderPlan.interior}&`
    : "";

  const staff = isExistQueryData(orderPlan.staff)
    ? `staff=${orderPlan.staff}&`
    : "";

  const card = isExistQueryData(orderPlan.card)
    ? `card=${orderPlan.card}&`
    : "";

  const loan = isExistQueryData(orderPlan.loan)
    ? `loan=${orderPlan.loan}&`
    : "";

  const contract = isExistQueryData(orderPlan.contract)
    ? `contract=${orderPlan.contract}&`
    : "";

  const option = isExistQueryData(orderPlan.option)
    ? `option=${orderPlan.option}&`
    : "";

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
