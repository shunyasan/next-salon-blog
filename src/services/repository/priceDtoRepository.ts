import { Gender, OptionKind } from "@prisma/client";
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

export const priceDtoRepository = () => {
  // constructor(private readonly prisma = prisma.clinicArea) {}

  const checkEmptyData = (val?: string) => {
    // const val = val as string;
    if (val && val !== "" && val !== "none") {
      return val;
    }
  };

  const beforeGetPrices = async (orderPlan: OrderPlanQuery) => {
    // // const machines = await getIdfindBySkinColorAndHairType(
    // //   orderPlan.skinCollor,
    // //   orderPlan.hair
    // // );
    // const targetMachine =
    //   machines.length > 0 ? machines.map((data) => data.id) : [];

    const sort = chackSort(orderPlan.sort);
    const numOfOpt = numOfOptions(orderPlan);
    const options =
      numOfOpt > 0 ? await getOptionClinicIds(orderPlan) : undefined;

    return {
      sort,
      options,
    };
  };

  const getAllPrices = async (
    orderPlan: OrderPlanQuery,
    // tableName: string,
    take?: number,
    skip?: number
  ): Promise<PriceDto[]> => {
    const { options, sort } = await beforeGetPrices(orderPlan);

    const ans = await prisma.price.findMany({
      // const ans = {
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
          machine: {
            some: {
              machineId: {
                in: orderPlan.machineIds,
              },
            },
          },
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
    const { options } = await beforeGetPrices(orderPlan);

    const ans = await prisma.price.count({
      where: {
        OR: [{ gender: orderPlan.gender }, { gender: "both" }],
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
          machine: {
            some: {
              machineId: {
                in: orderPlan.machineIds,
              },
            },
          },
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
