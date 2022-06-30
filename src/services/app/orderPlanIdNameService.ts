import { OrderPlanIdName } from "types/app/OrderPlanIdName";

export default class OrderPlanIdNameService {
  defaultData: OrderPlanIdName = {
    gender: { id: "男性", name: "男性" },
    paySystem: { id: "総額", name: "総額" },
    originParts: { id: "Z000001", name: "顔" },
    AboutCategory: { id: "A000001", name: "顔（鼻から上）" },
    parts: { id: "none", name: "未選択" },
    skinCollor: { id: "薄茶色", name: "薄茶色" },
    hair: { id: "標準", name: "標準" },
    roomType: { id: "none", name: "未選択" },
    interior: { id: "none", name: "未選択" },
    staff: { id: "none", name: "未選択" },
    card: { id: "none", name: "未選択" },
    loan: { id: "none", name: "未選択" },
    contract: { id: "none", name: "未選択" },
    option: { id: "none", name: "未選択" },
  };
}
