import { ParsedUrlQuery } from "querystring";
import { orderPlanIdNameService } from "services/service";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { OrderPlanQuery } from "types/app/OrderPlanQuery";
import { OrderPlanIdNameService } from "./orderPlanIdNameService";

export class OrderPlanQueryService {
  constructor(
    private readonly orderPlanIdNameService: OrderPlanIdNameService
  ) {}
  getOrderPlanQuery = (query: ParsedUrlQuery): OrderPlanQuery => {
    const data = this.orderPlanIdNameService.defaultData;

    const orderPlan: OrderPlanQuery = {
      gender: this.checkEmptyData(query.gender) || data.gender.id,
      paySystem: this.checkEmptyData(query.paySystem) || data.paySystem.id,
      originParts:
        this.checkEmptyData(query.originParts) || data.originParts.id,
      aboutCategory:
        this.checkEmptyData(query.aboutCategory) || data.aboutCategory.id,
      parts: this.checkEmptyData(query.parts) || data.parts.id,
      skinCollor: this.checkEmptyData(query.skinCollor) || data.skinCollor.id,
      hair: this.checkEmptyData(query.hair) || data.hair.id,
      roomType: this.checkEmptyData(query.roomType) || data.roomType.id,
      interior: this.checkEmptyData(query.interior) || data.interior.id,
      staff: this.checkEmptyData(query.staff) || data.staff.id,
      card: this.checkEmptyData(query.card) || data.card.id,
      loan: this.checkEmptyData(query.loan) || data.loan.id,
      contract: this.checkEmptyData(query.contract) || data.contract.id,
      option: this.checkEmptyData(query.option) || data.option.id,
      sort: this.checkEmptyData(query.sort) || data.sort.id,
    };
    return orderPlan;
  };

  /**
   * OrderPlanQueryのapi用の文字列
   * noneも全て返す。
   * ormでnoneを判定する
   */
  createOrderPlanQueryString = (query: ParsedUrlQuery) => {
    if (!query || !Object.keys(query).length) {
      return "";
    }
    const changed = Object.entries(query).map(([key, val]) => `${key}=${val}&`);
    const queryToString = changed.reduce((a, b) => a + b);
    return queryToString;
  };

  checkEmptyData(val?: string | string[]) {
    return checkEmpty(val);
  }
}

export const createParameter = (idName: OrderPlanIdName) => {
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

export const checkEmpty = (val?: string | string[]) => {
  const data = val as string;
  return data && data !== "" ? data : undefined;
};
