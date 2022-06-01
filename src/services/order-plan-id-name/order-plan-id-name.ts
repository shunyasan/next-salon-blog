import { OrderPlan } from "types/app/OrderPlan";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";

export const changeOrderPlanToOrderPlanIdName = (
  orderParams: OrderPlan
): OrderPlanIdName => {
  const data: OrderPlanIdName = {
    gender: { id: orderParams.gender, name: orderParams.gender },
    paySystem: { id: orderParams.paySystem, name: orderParams.paySystem },
    originParts: {
      id: orderParams.originParts,
      name: orderParams.originParts,
    },
    AboutCategory: {
      id: orderParams.AboutCategory,
      name: orderParams.AboutCategory,
    },
    parts: { id: orderParams.parts, name: orderParams.parts },
    skinCollor: {
      id: orderParams.skinCollor,
      name: orderParams.skinCollor,
    },
    hair: { id: orderParams.hair, name: orderParams.hair },
    roomType: { id: orderParams.roomType, name: orderParams.roomType },
    interior: { id: orderParams.interior, name: orderParams.interior },
    staff: {
      id: orderParams.staff.toString(),
      name: orderParams.staff.toString(),
    },
    card: { id: orderParams.card, name: orderParams.card },
    loan: { id: orderParams.loan, name: orderParams.loan },
    contract: { id: orderParams.contract, name: orderParams.contract },
    option: { id: orderParams.option, name: orderParams.option },
  };
  return data;
};
