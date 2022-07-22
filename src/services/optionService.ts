import { Clinic, Option, OptionKind } from "@prisma/client";

export const optionService = () => {
  const checkOptionPrice = (options: Option[], key: string) => {
    const find = options.find((option) => option.kind === key);
    if (find) {
      const price = optionPriceToString(find.price);
      const more = find.moreCharge ? "〜" : "";
      const term = find.terms ? "※" : "";
      return price + more + term;
    } else {
      return "ー";
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
        return "ー";
    }
  };

  const selectTitle = () => {};

  return {
    checkOptionPrice,
    optionPriceToString,
  };
};
