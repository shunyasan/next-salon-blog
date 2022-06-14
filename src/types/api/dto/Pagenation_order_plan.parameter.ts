import { OrderPlan } from "types/app/OrderPlan";

export interface PagenationOrderPlan extends OrderPlan {
  take: number;
  skip: number;
}
