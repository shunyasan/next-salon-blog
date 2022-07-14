import { aboutCategoryRepositoryFunc } from "services/orm/repository/aboutCategoryRepositoryFunc";
import { getBasePartsNameById } from "services/orm/repository/basePartsRepository";
import { getOriginCategoryNameById } from "services/orm/repository/originCategoryRepository";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { OrderPlanQuery } from "types/app/OrderPlanQuery";

export const defaultDataService = () => {
  const defaultOrderPlanIdName: OrderPlanIdName = {
    gender: { id: "女性", name: "女性" },
    paySystem: { id: "総額", name: "総額" },
    originParts: { id: "Z000001", name: "顔" },
    aboutCategory: { id: "A000001", name: "顔（鼻から上）" },
    parts: { id: "B000005", name: "眉全体" },
    skinCollor: { id: "薄茶色", name: "平均的な肌色" },
    hair: { id: "標準", name: "どちらとも言えない毛" },
    roomType: { id: "none", name: "こだわらない" },
    interior: { id: "none", name: "こだわらない" },
    staff: { id: "none", name: "こだわらない" },
    card: { id: "none", name: "こだわらない" },
    loan: { id: "none", name: "こだわらない" },
    contract: { id: "none", name: "こだわらない" },
    option: { id: "none", name: "こだわらない" },
    sort: { id: "none", name: "こだわらない" },
  };

  const defaultSort = {
    none: { id: "none", name: "こだわらない" },
    price_asc: { id: "price_asc", name: "安い順（総額" },
    price_desc: { id: "price_desc", name: "高い順（総額" },
    oncePrice_asc: { id: "oncePrice_asc", name: "安い順（１回分" },
    oncePrice_desc: { id: "oncePrice_desc", name: "高い順（１回分" },
  };

  return {
    defaultOrderPlanIdName,
    defaultSort,
  };
};
