import { OrderPlanIdName } from "types/OrderPlanIdName";

export const defaultData = () => {
  const defaultOrderPlanIdName: OrderPlanIdName = {
    gender: { id: "女性", name: "女性" },
    // paySystem: { id: "総額", name: "総額" },
    originParts: { id: "Z000001", name: "顔" },
    aboutCategory: { id: "A000001", name: "顔（鼻から上）" },
    parts: { id: "B000003", name: "額" },
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
    leakage: { id: "none", name: "こだわらない" },
    aftercare: { id: "none", name: "こだわらない" },
    anesthesia: { id: "none", name: "こだわらない" },
    firstVisitFees: { id: "none", name: "こだわらない" },
    revisitFees: { id: "none", name: "こだわらない" },
    shaving: { id: "none", name: "こだわらない" },
    skinTrouble: { id: "none", name: "こだわらない" },
  };

  const defaultSort = {
    none: { id: "none", name: "こだわらない" },
    price_asc: { id: "price_asc", name: "安い順（総額）" },
    price_desc: { id: "price_desc", name: "高い順（総額）" },
    oncePrice_asc: { id: "oncePrice_asc", name: "安い順（１回分）" },
    oncePrice_desc: { id: "oncePrice_desc", name: "高い順（１回分）" },
  };

  const defaultOption = {
    none: { id: "none", name: "こだわらない" },
    free: { id: "0", name: "無料" },
    one: { id: "1000", name: "1000円まで" },
    two: { id: "2000", name: "2000円まで" },
    thr: { id: "3000", name: "3000円まで" },
    for: { id: "4000", name: "4000円まで" },
  };

  return {
    defaultOrderPlanIdName,
    defaultSort,
    defaultOption,
  };
};
