import { aboutCategoryRepositoryFunc } from "services/repository/aboutCategoryRepositoryFunc";
import { getBasePartsNameById } from "services/repository/basePartsRepository";
import { getOriginCategoryNameById } from "services/repository/originCategoryRepository";
import { OrderPlanIdName } from "types/OrderPlanIdName";
import { OrderPlanQuery } from "types/OrderPlanQuery";

const { getAboutCategoryNameById } = aboutCategoryRepositoryFunc();

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
      paySystem: {
        id: orderParams.paySystem,
        name: checkNoneString(orderParams.paySystem),
      },
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
    };
    return data;
  };

  return {
    changeQueryToOrderPlanIdName,
  };
};
