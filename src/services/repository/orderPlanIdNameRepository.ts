import { defaultData } from "services/common/defaultData";
import { aboutCategoryRepositoryFunc } from "services/repository/aboutCategoryRepositoryFunc";
import { getBasePartsNameById } from "services/repository/basePartsRepository";
import { getOriginCategoryNameById } from "services/repository/originCategoryRepository";
import { OrderPlanIdName } from "types/OrderPlanIdName";
import { OrderPlanQuery } from "types/OrderPlanQuery";

const { getAboutCategoryNameById } = aboutCategoryRepositoryFunc();
const { defaultOption } = defaultData();

export const orderPlanIdNameRepository = () => {
  const checkNoneString = (val: string) => {
    if (val === "none") {
      return "こだわらない";
    }
    return val;
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
    const aboutCategory = await getAboutCategoryNameById(
      orderParams.aboutCategory
    );
    const baseParts = await getBasePartsNameById(orderParams.parts);

    const data: OrderPlanIdName = {
      gender: {
        id: orderParams.gender,
        name: checkNoneString(orderParams.gender),
      },
      // paySystem: {
      //   id: orderParams.paySystem,
      //   name: checkNoneString(orderParams.paySystem),
      // },
      originParts: {
        id: orderParams.originParts,
        name: originCategory || "",
      },
      aboutCategory: {
        id: orderParams.aboutCategory,
        name: aboutCategory || "",
      },
      parts: { id: orderParams.parts, name: baseParts || "" },
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
