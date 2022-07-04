import { OrderPlanQuery } from "./app/OrderPlanQuery";

export interface PagenationOrderPlan extends OrderPlanQuery {
  take: number;
  skip: number;
}
