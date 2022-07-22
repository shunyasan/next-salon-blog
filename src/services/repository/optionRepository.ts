import { OptionKind } from "@prisma/client";
import { prisma } from "services/common/prisma";
import { OrderPlanQuery } from "types/OrderPlanQuery";
import { priceDtoRepository } from "./priceDtoRepository";

export const optionRepository = () => {
  const checkNumberData = (val: string) => {
    // const val = val as string;
    if (val && val !== "" && val !== "none") {
      const num = Number(val);
      const res = num >= 0 ? num : undefined;
      return res;
    }
  };

  const checkEmptyData = (val?: string) => {
    // const val = val as string;
    if (val && val !== "" && val !== "none") {
      return val;
    }
  };

  const checkOptionData = (key: OptionKind, val: string) => {
    // const val = val as string;
    if (val && val !== "" && val !== "none") {
      return key;
    }
  };

  const numOfOptions = (orderPlan: OrderPlanQuery) => {
    const nums: number[] = Object.entries(OptionKind).map(([key, val]) => {
      const res = checkEmptyData(orderPlan[val]) ? 1 : 0;
      return res;
    });
    const sum = nums.reduce((pre, next) => pre + next);
    return sum;
  };

  const getGroupByOption = async (orderPlan: OrderPlanQuery) => {
    const numOfCondition = numOfOptions(orderPlan);
    const option = await prisma.option.groupBy({
      by: ["clinicId"],
      where:
        numOfCondition > 0
          ? {
              OR: [
                {
                  kind: checkOptionData(
                    OptionKind.contract,
                    orderPlan.contract
                  ),
                },
                {
                  kind: checkOptionData(
                    OptionKind.firstVisitFees,
                    orderPlan.firstVisitFees
                  ),
                  price: {
                    lte: checkNumberData(orderPlan.firstVisitFees),
                  },
                },
                {
                  kind: checkOptionData(
                    OptionKind.revisitFees,
                    orderPlan.revisitFees
                  ),
                  price: {
                    lte: checkNumberData(orderPlan.revisitFees),
                  },
                },
                {
                  kind: checkOptionData(
                    OptionKind.aftercare,
                    orderPlan.aftercare
                  ),
                  price: {
                    lte: checkNumberData(orderPlan.aftercare),
                  },
                },
                {
                  kind: checkOptionData(
                    OptionKind.anesthesia,
                    orderPlan.anesthesia
                  ),
                  price: {
                    lte: checkNumberData(orderPlan.anesthesia),
                  },
                },
                {
                  kind: checkOptionData(OptionKind.leakage, orderPlan.leakage),
                  price: {
                    lte: checkNumberData(orderPlan.leakage),
                  },
                },
                {
                  kind: checkOptionData(OptionKind.shaving, orderPlan.shaving),
                  price: {
                    lte: checkNumberData(orderPlan.shaving),
                  },
                },
                {
                  kind: checkOptionData(
                    OptionKind.skinTrouble,
                    orderPlan.skinTrouble
                  ),
                  price: {
                    lte: checkNumberData(orderPlan.skinTrouble),
                  },
                },
              ],
            }
          : undefined,
      having: {
        clinicId: {
          _count: {
            gte: numOfCondition,
          },
        },
      },
    });
    return option;
  };

  const getOptionClinicIds = async (orderPlan: OrderPlanQuery) => {
    const getOptions = await getGroupByOption(orderPlan);
    const res = getOptions.map((data) => data.clinicId);
    return res;
  };

  return { getOptionClinicIds, numOfOptions };
};
