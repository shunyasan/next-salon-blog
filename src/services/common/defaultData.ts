import { OrderPlanIdName } from "types/OrderPlanIdName";

export const defaultData = () => {
  const defaultOrderPlanIdName: OrderPlanIdName = {
    gender: { id: "lady", name: "女性" },
    area: { id: "AC000003", name: "渋谷区" },
    originParts: { id: "ORC000001", name: "顔・首" },
    aboutCategory: { id: "ABC000002", name: "セット（顔）" },
    parts: { id: "BSC000012", name: "顔全体" },
    // skinCollor: { id: "薄茶色", name: "平均的な肌色" },
    // hair: { id: "標準", name: "どちらとも言えない毛" },
    roomType: { id: "none", name: "指定なし" },
    interior: { id: "none", name: "指定なし" },
    staff: { id: "none", name: "指定なし" },
    card: { id: "none", name: "指定なし" },
    loan: { id: "none", name: "指定なし" },
    contract: { id: "none", name: "指定なし" },
    option: { id: "none", name: "指定なし" },
    sort: { id: "none", name: "指定なし" },
    leakage: { id: "none", name: "指定なし" },
    aftercare: { id: "none", name: "指定なし" },
    anesthesia: { id: "none", name: "指定なし" },
    firstVisitFees: { id: "none", name: "指定なし" },
    revisitFees: { id: "none", name: "指定なし" },
    shaving: { id: "none", name: "指定なし" },
    skinTrouble: { id: "none", name: "指定なし" },
    machineIds: [],
  };

  const defaultSort = {
    none: { id: "none", name: "指定なし" },
    price_asc: { id: "price_asc", name: "安い順（総額）" },
    price_desc: { id: "price_desc", name: "高い順（総額）" },
    oncePrice_asc: { id: "oncePrice_asc", name: "安い順（１回分）" },
    oncePrice_desc: { id: "oncePrice_desc", name: "高い順（１回分）" },
  };

  const defaultOption = {
    none: { id: "none", name: "指定なし" },
    free: { id: "0", name: "無料" },
    one: { id: "1000", name: "1000円まで" },
    two: { id: "2000", name: "2000円まで" },
    thr: { id: "3000", name: "3000円まで" },
    for: { id: "4000", name: "4000円まで" },
  };

  const defaultArea = {
    shibuya: { id: "AC000003", name: "渋谷区" },
  };

  return {
    defaultOrderPlanIdName,
    defaultSort,
    defaultOption,
    defaultArea,
  };
};
