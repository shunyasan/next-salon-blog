import { Gender } from "./Gender";

export type OrderPlanQuery = {
  gender: Gender;
  area: string;
  originParts: string;
  aboutCategory: string;
  parts: string;
  // skinCollor: string;
  // hair: string;
  roomType: string;
  interior: string;
  staff: string;
  card: string;
  loan: string;
  contract: string;
  option: string;
  sort: string;
  leakage: string;
  aftercare: string;
  anesthesia: string;
  firstVisitFees: string;
  revisitFees: string;
  shaving: string;
  skinTrouble: string;
  machineIds: string[];
  times: number[];
  prices: number[];
};
