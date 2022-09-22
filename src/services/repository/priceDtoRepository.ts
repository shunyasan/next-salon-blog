import { Gender, OptionKind } from "@prisma/client";
import { defaultData } from "services/common/defaultData";
import { prisma } from "services/common/prisma";
import { OrderPlanQuery } from "types/OrderPlanQuery";
import { PagenationParameter } from "types/PagenationParameterDto";
import { PriceDto } from "types/PriceDto";
import { sortPlanService } from "../sortPlanService";
import { IdAndNameRepository } from "./IdAndNameRepository";
import { optionRepository } from "./optionRepository";

const { getOptionClinicIds, numOfOptions } = optionRepository();
const { getIdfindBySkinColorAndHairType } = IdAndNameRepository();
const { chackSort } = sortPlanService();
const { defaultOrderPlanIdName } = defaultData();

export const priceDtoRepository = () => {
  // constructor(private readonly prisma = prisma.clinicArea) {}

  const checkEmptyData = (val?: string) => {
    // const val = val as string;
    if (val && val !== "" && val !== "none") {
      return val;
    }
  };

  /**
   *
   * @param val
   * @param max
   * @param coef かける係数
   * @returns
   */

  const checkMaxDataMulti = (val: number, max: number, coef?: number) => {
    if (val < max) {
      return coef ? val * coef : val;
    }
    return undefined;
  };

  const beforeGetPrices = async (orderPlan: OrderPlanQuery) => {
    // // const machines = await getIdfindBySkinColorAndHairType(
    // //   orderPlan.skinCollor,
    // //   orderPlan.hair
    // // );
    // const targetMachine =
    //   machines.length > 0 ? machines.map((data) => data.id) : [];
    const priceCoef = 10000;

    const sort = chackSort(orderPlan.sort);
    const numOfOpt = numOfOptions(orderPlan);
    const options =
      numOfOpt > 0 ? await getOptionClinicIds(orderPlan) : undefined;

    const times = {
      min: orderPlan.times[0],
      max: checkMaxDataMulti(
        orderPlan.times[1],
        defaultOrderPlanIdName.times.max
      ),
    };
    const once = {
      min: orderPlan.prices[0] * priceCoef,
      max: checkMaxDataMulti(
        orderPlan.prices[1],
        defaultOrderPlanIdName.prices.max,
        priceCoef
      ),
    };

    return {
      sort,
      options,
      times,
      once,
    };
  };

  const getAllPrices = async (
    orderPlan: OrderPlanQuery,
    // tableName: string,
    take?: number,
    skip?: number
  ): Promise<PriceDto[]> => {
    const { options, sort, times, once } = await beforeGetPrices(orderPlan);

    const ans = await prisma.price.findMany({
      include: {
        clinic: {
          include: {
            clinicOpeningHours: true,
            picture: {
              orderBy: {
                id: "asc",
              },
            },
            options: {
              distinct: ["kind"],
              orderBy: {
                price: "asc",
              },
            },
          },
        },
      },
      where: {
        OR: [{ gender: orderPlan.gender }, { gender: "both" }],
        oncePrice: {
          gte: once.min,
          lte: once.max,
        },
        times: {
          gte: times.min,
          lte: times.max,
        },
        parts: {
          baseParts: {
            some: {
              baseParts: {
                basicCategoryId: checkEmptyData(orderPlan.parts),
              },
            },
          },
        },
        clinic: {
          id: {
            in: options,
          },
          OR: [{ staffGender: orderPlan.gender }, { staffGender: "both" }],
          roomType: checkEmptyData(orderPlan.roomType),
          interior: checkEmptyData(orderPlan.interior),
          cardPay: checkEmptyData(orderPlan.card),
          medhicalLoan: checkEmptyData(orderPlan.loan),
          machine:
            orderPlan.machineIds.length > 0
              ? {
                  some: {
                    machineId: {
                      in: orderPlan.machineIds,
                    },
                  },
                }
              : undefined,
        },
      },
      take: take,
      skip: skip,
      orderBy: {
        oncePrice: sort?.column === "oncePrice" ? sort.sort : undefined,
        price: sort?.column === "price" ? sort.sort : undefined,
      },
    });
    return ans;
  };

  const getCountMaxPlan = async (
    orderPlan: OrderPlanQuery
  ): Promise<number> => {
    const { options, times, once } = await beforeGetPrices(orderPlan);

    const ans = await prisma.price.count({
      where: {
        OR: [{ gender: orderPlan.gender }, { gender: "both" }],
        oncePrice: {
          gte: once.min,
          lte: once.max,
        },
        times: {
          gte: times.min,
          lte: times.max,
        },
        parts: {
          baseParts: {
            some: {
              baseParts: {
                basicCategoryId: checkEmptyData(orderPlan.parts),
              },
            },
          },
        },
        clinic: {
          id: {
            in: options,
          },
          OR: [{ staffGender: orderPlan.gender }, { staffGender: "both" }],
          roomType: checkEmptyData(orderPlan.roomType),
          interior: checkEmptyData(orderPlan.interior),
          cardPay: checkEmptyData(orderPlan.card),
          medhicalLoan: checkEmptyData(orderPlan.loan),
          machine:
            orderPlan.machineIds.length > 0
              ? {
                  some: {
                    machineId: {
                      in: orderPlan.machineIds,
                    },
                  },
                }
              : undefined,
        },
      },
    });

    return ans;
  };

  const getPriceByClinic = async (
    clinicId: string,
    aboutId: string,
    gender: Gender
  ) => {
    // const table = await aboutCategoryRepository.getPriceTableName(aboutId);
    const excludeGender = gender === "men" ? 1 : 2;

    const price = await prisma.price.findMany({
      where: {
        clinicId: clinicId,
        OR: [{ gender: gender }, { gender: "both" }],
        parts: {
          baseParts: {
            some: {
              baseParts: {
                basicCategory: {
                  aboutCategoryId: aboutId,
                },
              },
            },
          },
        },
      },
    });
    return price;
  };

  const getPriceOrderPlan = async (
    orderPlan: OrderPlanQuery,
    pagenation: PagenationParameter
    // ↓に変更する可能性
    // pagenationOrderPlan: PagenationOrderPlan
  ): Promise<PriceDto[]> => {
    if (!orderPlan) {
      return [];
    }

    const getPrices = await getAllPrices(
      orderPlan,
      pagenation.take,
      pagenation.skip
    );
    return getPrices as PriceDto[];
  };

  return {
    getAllPrices,
    getCountMaxPlan,
    getPriceByClinic,
    getPriceOrderPlan,
    checkEmptyData,
  };
};
