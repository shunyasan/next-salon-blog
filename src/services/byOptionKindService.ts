import { Option, OptionKind } from "@prisma/client";
import { ByOptionKind } from "../types/ByOptionKind";

export const byOptionKindService = () => {
  const selectOptionName = (
    key: string,
    option: Option,
    byKind: ByOptionKind
  ): ByOptionKind => {
    switch (key) {
      case OptionKind.leakage:
        byKind.leakage = option;
        break;
      case OptionKind.aftercare:
        byKind.aftercare = option;
        break;
      case OptionKind.anesthesia:
        byKind.anesthesia = option;
        break;
      case OptionKind.contractCancel:
        byKind.contractCancel = option;
        break;
      case OptionKind.firstVisitFees:
        byKind.firstVisitFees = option;
        break;
      case OptionKind.revisitFees:
        byKind.revisitFees = option;
        break;
      case OptionKind.shaving:
        byKind.shaving = option;
        break;
      case OptionKind.skinTrouble:
        byKind.skinTrouble = option;
        break;
    }
    return byKind;
  };

  const createByOptionKind = (options: Option[]) => {
    const byKind: ByOptionKind = {};
    for (const option of options) {
      selectOptionName(option.kind, option, byKind);
    }
    return byKind;
  };

  return {
    createByOptionKind,
  };
};
