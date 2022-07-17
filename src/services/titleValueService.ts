import { Clinic, Option, OptionKind } from "@prisma/client";
import { OrderPlanTitle } from "enums/OrderPlanTitle";
import { OrderPlanIdName } from "types/OrderPlanIdName";
import { TitleValue } from "types/TitleValue";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";
import { RelationClinic } from "types/RelationClinic";

export const titleValueService = () => {
  const getModalSearchConditionBoxData = (orderPlanData: OrderPlanIdName) => {
    const conditions: TitleValue[] = [];
    for (const [key, value] of Object.entries(orderPlanData)) {
      const data = findOrderPlanTitle(key);
      if (data && value.id !== "none") {
        const ans: TitleValue = {
          title: data,
          value: value.name.toString(),
        };
        conditions.push(ans);
      }
    }
    return conditions;
  };

  const findOrderPlanTitle = (key: string) => {
    const title: any = OrderPlanTitle;
    const data: string = title[key];

    return data;
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

  const checkNoneValue = (val?: string | null) => {
    if (!val || val === "なし") {
      return "-";
    }
    return val;
  };

  const ClinicOptionTitleValue = (clinicOption: Option[]): TitleValue[] => {
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

  const newOptionFunc = (clinic: RelationClinic) => {
    const payment: TitleValue[] = [
      {
        title: "カード払い",
        value: checkNoneValue(clinic.cardPay),
      },
      {
        title: "医療ローン",
        value: checkNoneValue(clinic.medhicalLoan),
      },
    ];
    // const contractCancel = {
    //   name: "途中解約",
    //   text: checkNoneValue(clinic.options.contractCancellation),
    // };
    return payment;
  };

  const ClinicOtherTitleValue = (clinic: Clinic) => {
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

  return {
    getModalSearchConditionBoxData,
    findOrderPlanTitle,
    ClinicOptionTitleValue,
    ClinicOtherTitleValue,
    newOptionFunc,
  };
};
