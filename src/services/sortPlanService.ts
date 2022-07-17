import { defaultData } from "services/common/defaultData";
import { SortPlan } from "types/SortPlan";

const { defaultSort } = defaultData();

export const sortPlanService = () => {
  const chackSort = (value: string): SortPlan | undefined => {
    const { price_asc, price_desc, oncePrice_asc, oncePrice_desc, none } =
      defaultSort;

    switch (value) {
      case price_asc.id:
        return { column: "price", sort: "asc" };
      case price_desc.id:
        return { column: "price", sort: "desc" };
      case oncePrice_asc.id:
        return { column: "oncePrice", sort: "asc" };
      case oncePrice_desc.id:
        return { column: "oncePrice", sort: "desc" };
      default:
        return undefined;
    }
  };

  return {
    chackSort,
  };
};
