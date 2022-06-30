import { IdAndNameDto } from "types/IdAndNameDto";

// テスト用
// 削除予定
export const tweet: (IdAndNameDto & { clinicId: string })[] = [
  { id: "DMTC_tokyo", name: "DMTC美容皮膚科 銀座院", clinicId: "AA000060" },
  {
    id: "davide_shibuya",
    name: "ダビデクリニック 渋谷院",
    clinicId: "AA000261",
  },
  { id: "blancclinic_t", name: "ブランクリニック渋谷", clinicId: "AA000006" },
];
