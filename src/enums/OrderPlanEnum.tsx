import { OrderPlanEnumType } from "types/OrderPlanEnumType";

export const OrderPlanEnum: OrderPlanEnumType = {
  gender: { query: "ge", name: "性別" },
  paySystem: { query: "pay", name: "料金体系" },
  originCategory: { query: "ori", name: "大カテゴリ" },
  aboutCategory: { query: "abo", name: "小カテゴリ" },
  parts: { query: "par", name: "部位" },
  skinCollor: { query: "sk", name: "肌色" },
  hair: { query: "ha", name: "毛量" },
  roomType: { query: "ro", name: "施術室" },
  interior: { query: "in", name: "内装" },
  staff: { query: "sta", name: "施術者" },
  card: { query: "ca", name: "カード払い" },
  loan: { query: "lo", name: "医療ローン" },
  contract: { query: "co", name: "コースの解約" },
  option: { query: "op", name: "" },
};
