import { Clinic, Option, OptionKind } from "@prisma/client";
import { useCallback } from "react";
import { TitleValue } from "types/app/TitleValue";
import { ByOptionKind } from "types/ByOptionKind";

export const ClinicDetailTab = () => {
  const tab: TitleValue[] = [
    {
      title: "クリニック概要",
      value: "",
    },
    {
      title: "オプションサービス",
      value: "option",
    },
    {
      title: "プラン詳細",
      value: "plan",
    },
  ];
  return tab;
};

export const checkNoneValue = (val?: string | null) => {
  if (!val || val === "なし") {
    return "-";
  }
  return val;
};

const checkOptionPrice = (options: Option[], key: string) => {
  const find = options.find((option) => option.kind === key);
  if (find) {
    const price = optionPriceToString(find.price);
    return price;
  } else {
    return "-";
  }
};

const optionPriceToString = (val?: number) => {
  switch (true) {
    case val === 0:
      return "無料";
    case val!! > 50000:
      return "有料";
    case val!! > 0:
      return val + "円";
    default:
      return "-";
  }
};

// const choseOptionName = (key: string) => {
//   switch (key) {
//     case OptionKind.leakage:
//       return "照射漏れ";
//     case OptionKind.aftercare:
//       return "アフターケア";
//     case OptionKind.anesthesia:
//       return "麻酔";
//     case OptionKind.contractCancel:
//       return "途中解約";
//     case OptionKind.firstVisitFees:
//       return "初診料";
//     case OptionKind.revisitFees:
//       return "再診料";
//     case OptionKind.shaving:
//       return "剃毛";
//     case OptionKind.skinTrouble:
//       return "トラブル対応";
//     default:
//       return "その他";
//   }
// };

export const ClinicOptionTitleValue = (
  clinicOption: Option[]
): TitleValue[] => {
  // const values = clinicOption.map((option) => {
  //   const title = choseOptionName(option.kind);
  //   const value = checkOptionPrice(option.price);
  //   const data: TitleValue = {
  //     title,
  //     value,
  //   };
  //   return data;
  // });
  const datas: TitleValue[] = [
    {
      title: "初診料",
      value: checkOptionPrice(clinicOption, OptionKind.firstVisitFees),
    },
    {
      title: "再診料",
      value: checkOptionPrice(clinicOption, OptionKind.revisitFees),
    },
    {
      title: "照射漏れ",
      value: checkOptionPrice(clinicOption, OptionKind.leakage),
    },
    {
      title: "アフターケア",
      value: checkOptionPrice(clinicOption, OptionKind.aftercare),
    },
    {
      title: "麻酔",
      value: checkOptionPrice(clinicOption, OptionKind.anesthesia),
    },
    {
      title: "剃毛",
      value: checkOptionPrice(clinicOption, OptionKind.shaving),
    },
    {
      title: "トラブル対応",
      value: checkOptionPrice(clinicOption, OptionKind.skinTrouble),
    },
    {
      title: "途中解約",
      value: checkOptionPrice(clinicOption, OptionKind.contractCancel),
    },
  ];
  return datas;
};

export const ClinicOtherTitleValue = (clinic: Clinic) => {
  const datas: TitleValue[] = [
    { title: "住所", value: clinic.address },
    {
      title: "最寄駅",
      value: clinic.nearestStation,
    },
    // {
    //   title: "URL",
    //   value: clinic.url,
    // },
    {
      title: "電話番号",
      value: clinic.tel || "",
    },
  ];
  return datas;
};
