import { aboutCategoryRepositoryFunc } from "services/orm/repository/aboutCategoryRepositoryFunc";
import { getBasePartsNameById } from "services/orm/repository/basePartsRepository";
import { getOriginCategoryNameById } from "services/orm/repository/originCategoryRepository";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { OrderPlanQuery } from "types/app/OrderPlanQuery";

const { getAboutCategoryNameById } = aboutCategoryRepositoryFunc();

export const OrderPlanIdNameService = () => {
  // const defaultData: OrderPlanIdName = defaultOrderPlanIdName;

  // const defaultOrderPlanIdName = (): OrderPlanIdName => {
  //   const data: OrderPlanIdName = {
  //     gender: { id: "女性", name: "女性" },
  //     paySystem: { id: "総額", name: "総額" },
  //     originParts: { id: "Z000001", name: "顔" },
  //     aboutCategory: { id: "A000001", name: "顔（鼻から上）" },
  //     parts: { id: "B000005", name: "眉全体" },
  //     skinCollor: { id: "薄茶色", name: "平均的な肌色" },
  //     hair: { id: "標準", name: "どちらとも言えない毛" },
  //     roomType: { id: "none", name: "こだわらない" },
  //     interior: { id: "none", name: "こだわらない" },
  //     staff: { id: "none", name: "こだわらない" },
  //     card: { id: "none", name: "こだわらない" },
  //     loan: { id: "none", name: "こだわらない" },
  //     contract: { id: "none", name: "こだわらない" },
  //     option: { id: "none", name: "こだわらない" },
  //     sort: { id: "none", name: "こだわらない" },
  //   };
  //   return data;
  // };

  const defaultSort = {
    none: { id: "none", name: "こだわらない" },
    price_asc: { id: "price_asc", name: "安い順（総額" },
    price_desc: { id: "price_desc", name: "高い順（総額" },
    oncePrice_asc: { id: "oncePrice_asc", name: "安い順（１回分" },
    oncePrice_desc: { id: "oncePrice_desc", name: "高い順（１回分" },
  };

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
    // defaultOrderPlanIdName,
    defaultSort,
  };
};
