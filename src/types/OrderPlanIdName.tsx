import { Gender } from "./Gender";
import { IdAndNameDto } from "./IdAndNameDto";

// id: ABC0000011など検索に使う文字列
// name: 表示用の文字列
export type OrderPlanIdName = {
  gender: { id: Gender; name: string };
  area: IdAndNameDto;
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
