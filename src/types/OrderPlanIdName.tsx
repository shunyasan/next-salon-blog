import { IdAndNameDto } from "./IdAndNameDto";

// id: A000001など検索に使う文字列
// name: 表示用の文字列
export type OrderPlanIdName = {
  gender: IdAndNameDto;
  // paySystem: IdAndNameDto;
  originParts: IdAndNameDto;
  aboutCategory: IdAndNameDto;
  parts: IdAndNameDto;
  skinCollor: IdAndNameDto;
  hair: IdAndNameDto;
  roomType: IdAndNameDto;
  interior: IdAndNameDto;
  staff: IdAndNameDto;
  card: IdAndNameDto;
  loan: IdAndNameDto;
  contract: IdAndNameDto;
  option: IdAndNameDto;
  sort: IdAndNameDto;
  leakage: IdAndNameDto;
  aftercare: IdAndNameDto;
  anesthesia: IdAndNameDto;
  firstVisitFees: IdAndNameDto;
  revisitFees: IdAndNameDto;
  shaving: IdAndNameDto;
  skinTrouble: IdAndNameDto;
};

// export type OrderPlanIdName = {
//   gender: string;
//   paySystem: string;
//   originParts: IdAndNameDto;
//   aboutCategory: IdAndNameDto;
//   parts: IdAndNameDto | null;
//   skinCollor: string;
//   hair: string;
//   roomType: string;
//   interior: string;
//   staff: number;
//   card: string;
//   loan: string;
//   contract: string;
//   option: string;

// };
