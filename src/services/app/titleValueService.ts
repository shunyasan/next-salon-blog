import { OrderPlanEnum } from "enums/OrderPlanEnum";
import { OrderPlan } from "types/app/OrderPlan";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { TitleValue } from "types/app/TitleValue";

export class TitleValueService {
  getModalSearchConditionBoxData(orderPlanData: OrderPlanIdName) {
    const conditions: TitleValue[] = [];
    for (const [key, value] of Object.entries(orderPlanData)) {
      const isExist = value && this.checkNone(value.name);
      const data = isExist ? this.findOrderPlanEnum(key) : undefined;
      if (data) {
        const ans: TitleValue = {
          title: data.name,
          value: value.name.toString(),
        };
        conditions.push(ans);
      }
    }
    return conditions;
  }

  findOrderPlanEnum(key: string) {
    const data = Object.entries(OrderPlanEnum).find(([enumKey, enumVal]) => {
      return key === enumKey;
    });
    return data && data[1];
  }

  checkNone(value: string | number) {
    if (value && value !== "") {
      if (value !== "none") {
        return value;
      }
    }
  }
}
