import { defaultData } from "services/common/defaultData";
import { BasicCategoryRepository } from "./repository/basicCategoryRepository";
import { MachineRepository } from "./repository/machineRepository";

const { defaultOption, defaultOrderPlanIdName } = defaultData();
const { getBasicCategoryName } = BasicCategoryRepository();
const { getMachineInIds } = MachineRepository();

export const orderPlanIdNameService = () => {
  const checkNoneString = (val: string) => {
    if (val === "none") {
      return "指定なし";
    }
    return val;
  };

  const checkGenderString = (value: string) => {
    switch (value) {
      case "men":
        return "男性";
      default:
        return "女性";
    }
  };

  const checkAreaString = (value: string) => {
    switch (value) {
      case "AC000003":
        return "渋谷区";
      default:
        return "渋谷区";
    }
  };

  const checkSortString = (value: string) => {
    switch (value) {
      case "price_asc":
        return "安い順（総額）";
      case "price_desc":
        return "高い順（総額）";
      case "oncePrice_asc":
        return "安い順（１回分）";
      case "oncePrice_desc":
        return "高い順（１回分）";
      default:
        return "指定なし";
    }
  };

  const chackOptionValue = (value: string) => {
    switch (value) {
      case defaultOption.free.id:
        return defaultOption.free;
      case defaultOption.one.id:
        return defaultOption.one;
      case defaultOption.two.id:
        return defaultOption.two;
      case defaultOption.thr.id:
        return defaultOption.thr;
      case defaultOption.for.id:
        return defaultOption.for;
      default:
        return defaultOption.none;
    }
  };

  const checkNumber = (value: number | string, def: number) => {
    const num = Number(value);
    return isNaN(num) ? def : num;
  };

  return {
    checkNoneString,
    checkGenderString,
    checkAreaString,
    checkSortString,
    chackOptionValue,
    checkNumber,
  };
};
