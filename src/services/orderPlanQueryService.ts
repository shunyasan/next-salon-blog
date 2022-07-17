import { ParsedUrlQuery } from "querystring";
import { OrderPlanIdName } from "types/OrderPlanIdName";
import { OrderPlanQuery } from "types/OrderPlanQuery";
import { defaultData } from "./common/defaultData";

const { defaultOrderPlanIdName } = defaultData();

export const OrderPlanQueryService = () => {
  const getOrderPlanQuery = (query: ParsedUrlQuery): OrderPlanQuery => {
    const data = defaultOrderPlanIdName;

    const orderPlan: OrderPlanQuery = {
      gender: checkEmptyData(query.gender) || data.gender.id,
      paySystem: checkEmptyData(query.paySystem) || data.paySystem.id,
      originParts: checkEmptyData(query.originParts) || data.originParts.id,
      aboutCategory:
        checkEmptyData(query.aboutCategory) || data.aboutCategory.id,
      parts: checkEmptyData(query.parts) || data.parts.id,
      skinCollor: checkEmptyData(query.skinCollor) || data.skinCollor.id,
      hair: checkEmptyData(query.hair) || data.hair.id,
      roomType: checkEmptyData(query.roomType) || data.roomType.id,
      interior: checkEmptyData(query.interior) || data.interior.id,
      staff: checkEmptyData(query.staff) || data.staff.id,
      card: checkEmptyData(query.card) || data.card.id,
      loan: checkEmptyData(query.loan) || data.loan.id,
      contract: checkEmptyData(query.contract) || data.contract.id,
      option: checkEmptyData(query.option) || data.option.id,
      sort: checkEmptyData(query.sort) || data.sort.id,
    };
    return orderPlan;
  };

  /**
   * OrderPlanQueryのapi用の文字列
   * noneも全て返す。
   * ormでnoneを判定する
   */
  const createOrderPlanQueryString = (query: ParsedUrlQuery) => {
    if (!query || !Object.keys(query).length) {
      return "";
    }
    const changed = Object.entries(query).map(([key, val]) => `${key}=${val}&`);
    const queryToString = changed.reduce((a, b) => a + b);
    return queryToString;
  };

  const checkEmptyData = (val?: string | string[]) => {
    const data = val as string;
    return data && data !== "" ? data : undefined;
  };

  const createParameter = (idName: OrderPlanIdName) => {
    const data: OrderPlanQuery = {
      gender: idName.gender.id,
      paySystem: idName.paySystem.id,
      originParts: idName.originParts.id,
      aboutCategory: idName.aboutCategory.id,
      parts: idName.parts.id,
      skinCollor: idName.skinCollor.id,
      hair: idName.hair.id,
      roomType: idName.roomType.id,
      interior: idName.interior.id,
      staff: idName.staff.id,
      card: idName.card.id,
      loan: idName.loan.id,
      contract: idName.contract.id,
      option: idName.option.id,
      sort: idName.sort.id,
    };
    return data;
  };

  return {
    getOrderPlanQuery,
    createOrderPlanQueryString,
    createParameter,
  };
};
