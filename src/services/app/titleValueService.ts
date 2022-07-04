import { OrderPlanTitle } from "enums/OrderPlanTitle";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { TitleValue } from "types/app/TitleValue";

export class TitleValueService {
  getModalSearchConditionBoxData(orderPlanData: OrderPlanIdName) {
    const conditions: TitleValue[] = [];
    for (const [key, value] of Object.entries(orderPlanData)) {
      const data = this.findOrderPlanTitle(key);
      if (data && value.id !== "none") {
        const ans: TitleValue = {
          title: data,
          value: value.name.toString(),
        };
        conditions.push(ans);
      }
    }
    return conditions;
  }

  findOrderPlanTitle(key: string) {
    const title: any = OrderPlanTitle;
    const data: string = title[key];

    return data;
  }

  checkNone(value: string | number) {
    if (value && value !== "") {
      if (value !== "none") {
        return value;
      }
    }
  }
}
