import { defaultData } from "services/common/defaultData";
import { aboutCategoryRepository } from "services/common/repository";
import { getOriginCategoryNameById } from "services/repository/originCategoryRepository";
import { OrderPlanIdName } from "types/OrderPlanIdName";
import { OrderPlanQuery } from "types/OrderPlanQuery";
import { BasicCategoryRepository } from "./basicCategoryRepository";

const { defaultOption } = defaultData();
const { getBasicCategoryName } = BasicCategoryRepository();

export const orderPlanIdNameRepository = () => {
  const checkNoneString = (val: string) => {
    if (val === "none") {
      return "こだわらない";
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
        return "こだわらない";
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

  const changeQueryToOrderPlanIdName = async (orderParams: OrderPlanQuery) => {
    const originCategory = await getOriginCategoryNameById(
      orderParams.originParts
    );
    const aboutCategory =
      await aboutCategoryRepository.getAboutCategoryNameById(
        orderParams.aboutCategory
      );
    const basicCategory = await getBasicCategoryName(orderParams.parts);

    const data: OrderPlanIdName = {
      gender: {
        id: orderParams.gender,
        name: checkGenderString(orderParams.gender),
      },
      area: {
        id: orderParams.area,
        name: checkAreaString(orderParams.area),
      },
      originParts: {
        id: orderParams.originParts,
        name: originCategory || "",
      },
      aboutCategory: {
        id: orderParams.aboutCategory,
        name: aboutCategory || "",
      },
      parts: { id: orderParams.parts, name: basicCategory || "" },
      skinCollor: {
        id: orderParams.skinCollor,
        name: checkNoneString(orderParams.skinCollor),
      },
      hair: {
        id: orderParams.hair,
        name: checkNoneString(orderParams.hair),
      },
      roomType: {
        id: orderParams.roomType,
        name: checkNoneString(orderParams.roomType),
      },
      interior: {
        id: orderParams.interior,
        name: checkNoneString(orderParams.interior),
      },
      staff: {
        id: orderParams.staff,
        name: checkNoneString(orderParams.staff),
      },
      card: {
        id: orderParams.card,
        name: checkNoneString(orderParams.card),
      },
      loan: {
        id: orderParams.loan,
        name: checkNoneString(orderParams.loan),
      },
      contract: {
        id: orderParams.contract,
        name: checkNoneString(orderParams.contract),
      },
      option: {
        id: orderParams.option,
        name: checkNoneString(orderParams.option),
      },
      sort: {
        id: orderParams.sort,
        name: checkSortString(orderParams.sort),
      },
      leakage: chackOptionValue(orderParams.leakage),
      aftercare: chackOptionValue(orderParams.aftercare),
      anesthesia: chackOptionValue(orderParams.anesthesia),
      firstVisitFees: chackOptionValue(orderParams.firstVisitFees),
      revisitFees: chackOptionValue(orderParams.revisitFees),
      shaving: chackOptionValue(orderParams.shaving),
      skinTrouble: chackOptionValue(orderParams.skinTrouble),
    };
    return data;
  };

  return {
    changeQueryToOrderPlanIdName,
  };
};
