import { ParsedUrlQuery } from "querystring";
import { Gender } from "types/Gender";
import { OrderPlanIdName } from "types/OrderPlanIdName";
import { OrderPlanQuery } from "types/OrderPlanQuery";
import { defaultData } from "./common/defaultData";

const { defaultOrderPlanIdName } = defaultData();
const data = defaultOrderPlanIdName;

export const OrderPlanQueryService = () => {
  const checkNumber = (def: number[], val?: string | string[]) => {
    if (Array.isArray(val)) {
      return val.map((data, i) => {
        const num = Number(data);
        return isNaN(num) ? def[i] : num;
      });
    } else {
      return def;
    }
  };

  const getOrderPlanQuery = (query: ParsedUrlQuery): OrderPlanQuery => {
    // const data = defaultOrderPlanIdName;
    const time = checkNumber([data.times.min, data.times.max], query.times);
    const prices = checkNumber(
      [data.prices.min, data.prices.max],
      query.prices
    );

    const orderPlan: OrderPlanQuery = {
      gender: checkGenderData(query.gender) || data.gender.id,
      area: checkEmptyData(query.area) || data.area.id,
      originParts: checkEmptyData(query.originParts) || data.originParts.id,
      aboutCategory:
        checkEmptyData(query.aboutCategory) || data.aboutCategory.id,
      parts: checkEmptyData(query.parts) || data.parts.id,
      // skinCollor: checkEmptyData(query.skinCollor) || data.skinCollor.id,
      // hair: checkEmptyData(query.hair) || data.hair.id,
      roomType: checkEmptyData(query.roomType) || data.roomType.id,
      interior: checkEmptyData(query.interior) || data.interior.id,
      staff: checkEmptyData(query.staff) || data.staff.id,
      card: checkEmptyData(query.card) || data.card.id,
      loan: checkEmptyData(query.loan) || data.loan.id,
      contract: checkEmptyData(query.contract) || data.contract.id,
      option: checkEmptyData(query.option) || data.option.id,
      sort: checkEmptyData(query.sort) || data.sort.id,
      leakage: checkEmptyData(query.leakage) || data.leakage.id,
      aftercare: checkEmptyData(query.aftercare) || data.aftercare.id,
      anesthesia: checkEmptyData(query.anesthesia) || data.anesthesia.id,
      firstVisitFees:
        checkEmptyData(query.firstVisitFees) || data.firstVisitFees.id,
      revisitFees: checkEmptyData(query.revisitFees) || data.revisitFees.id,
      shaving: checkEmptyData(query.shaving) || data.shaving.id,
      skinTrouble: checkEmptyData(query.skinTrouble) || data.skinTrouble.id,
      machineIds: (query.machineIds as string[]) || data.machineIds,
      times: time,
      prices: prices,
    };
    return orderPlan;
  };

  /**
   * OrderPlanQueryのapi用の文字列
   * noneも全て返す。
   * ormでnoneを判定する
   */
  // const createOrderPlanQueryString = (query: ParsedUrlQuery) => {
  //   if (!query || !Object.keys(query).length) {
  //     return "";
  //   }
  //   const changed = Object.entries(query).map(([key, val]) => `${key}=${val}&`);
  //   const queryToString = changed.reduce((a, b) => a + b);
  //   return queryToString;
  // };

  const checkEmptyData = (val?: string | string[]) => {
    const data = val as string;
    return data && data !== "" ? data : undefined;
  };

  const checkGenderData = (val?: string | string[]) => {
    const data = val as Gender;
    return data;
  };

  const createParameter = (idName: OrderPlanIdName) => {
    const machines = idName.machineIds.map((data) => data.id);
    const times = [idName.times.min, idName.times.max];
    const prices = [idName.prices.min, idName.prices.max];

    const data: OrderPlanQuery = {
      gender: idName.gender.id,
      area: idName.area.id,
      originParts: idName.originParts.id,
      aboutCategory: idName.aboutCategory.id,
      parts: idName.parts.id,
      // skinCollor: idName.skinCollor.id,
      // hair: idName.hair.id,
      roomType: idName.roomType.id,
      interior: idName.interior.id,
      staff: idName.staff.id,
      card: idName.card.id,
      loan: idName.loan.id,
      contract: idName.contract.id,
      option: idName.option.id,
      sort: idName.sort.id,
      leakage: idName.leakage.id,
      aftercare: idName.aftercare.id,
      anesthesia: idName.anesthesia.id,
      firstVisitFees: idName.firstVisitFees.id,
      revisitFees: idName.revisitFees.id,
      shaving: idName.shaving.id,
      skinTrouble: idName.skinTrouble.id,
      machineIds: machines,
      times: times,
      prices: prices,
    };
    return data;
  };

  return {
    getOrderPlanQuery,
    createParameter,
  };
};
