import { OptionKind } from "@prisma/client";
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
    const excludeGender: number = orderPlan.gender === "men" ? 1 : 2;
    const excludeStaff: number = orderPlan.staff === "men" ? 1 : 2;

    const machines = await getIdfindBySkinColorAndHairType(
      orderPlan.skinCollor,
      orderPlan.hair
    );
    const targetMachine =
      machines.length > 0 ? machines.map((data) => data.id) : [];

    const sort = chackSort(orderPlan.sort);
    const numOfOpt = numOfOptions(orderPlan);
    const options =
      numOfOpt > 0 ? await getOptionClinicIds(orderPlan) : undefined;

    return {
      excludeGender,
      excludeStaff,
      targetMachine,
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
    const { excludeGender, excludeStaff, options, targetMachine, sort } =
      await beforeGetPrices(orderPlan);

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
        gender: {
          not: excludeGender || undefined,
        },
        parts: {
          baseParts: {
            some: {
              basePartsId: checkEmptyData(orderPlan.parts),
            },
          },
        },
        clinic: {
          id: {
            in: options,
          },
          staffGender: {
            not: excludeStaff || undefined,
          },
          roomType: checkEmptyData(orderPlan.roomType),
          interior: checkEmptyData(orderPlan.interior),
          cardPay: checkEmptyData(orderPlan.card),
          medhicalLoan: checkEmptyData(orderPlan.loan),
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
    const { excludeGender, excludeStaff, options, targetMachine } =
      await beforeGetPrices(orderPlan);

    const ans = await prisma.price.count({
      where: {
        gender: {
          not: excludeGender || undefined,
        },
        clinic: {
          id: {
            in: options,
          },
          staffGender: {
            not: excludeStaff || undefined,
          },
          roomType: checkEmptyData(orderPlan.roomType),
          interior: checkEmptyData(orderPlan.interior),
          cardPay: checkEmptyData(orderPlan.card),
          medhicalLoan: checkEmptyData(orderPlan.loan),
          options: checkEmptyData(orderPlan.contract)
            ? {
                some: {
                  kind: "contract",
                  price: {
                    gte: 0,
                  },
                },
              }
            : undefined,
        },
        parts: {
          baseParts: {
            some: {
              basePartsId: checkEmptyData(orderPlan.parts),
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
    gender: string
  ) => {
    // const table = await aboutCategoryRepository.getPriceTableName(aboutId);
    const excludeGender = gender === "men" ? 1 : 2;

    const price = await prisma.price.findMany({
      where: {
        clinicId: clinicId,
        gender: {
          not: excludeGender,
        },
        parts: {
          baseParts: {
            some: {
              baseParts: {
                aboutCategoryId: aboutId,
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
