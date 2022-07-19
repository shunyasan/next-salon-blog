import { prisma } from "services/common/prisma";
import { OrderPlanQuery } from "types/OrderPlanQuery";
import { PagenationParameter } from "types/PagenationParameterDto";
import { PriceDto } from "types/PriceDto";
import { sortPlanService } from "../sortPlanService";
import { IdAndNameRepository } from "./IdAndNameRepository";

const { getIdfindBySkinColorAndHairType } = IdAndNameRepository();
const { chackSort } = sortPlanService();

export const priceDtoRepository = () => {
  // constructor(private readonly prisma = prisma.clinicArea) {}

  const checkEmptyData = (val?: string | string[]) => {
    const data = val as string;
    if (data && data !== "" && data !== "none") {
      return data;
    }
  };

  const beforeGetPrices = async (orderPlan: OrderPlanQuery) => {
    const excludeGender: number = orderPlan.gender === "男性" ? 1 : 2;
    const excludeStaff: number = 0;
    // const excludeStaff: number = orderPlan.staff === "男性" ? 1 : 2;

    const machines = await getIdfindBySkinColorAndHairType(
      orderPlan.skinCollor,
      orderPlan.hair
    );
    const targetMachine =
      machines.length > 0 ? machines.map((data) => data.id) : [];

    const sort = chackSort(orderPlan.sort);
    return {
      excludeGender,
      excludeStaff,
      targetMachine,
      sort,
    };
  };

  const getAllPrices = async (
    orderPlan: OrderPlanQuery,
    // tableName: string,
    take?: number,
    skip?: number
  ): Promise<PriceDto[]> => {
    const { excludeGender, excludeStaff, targetMachine, sort } =
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
        parts: {
          include: {
            baseParts: true,
          },
        },
      },
      where: {
        partsId: checkEmptyData(orderPlan.parts),
        clinic: {
          staffGender: excludeStaff || undefined,
          roomType: checkEmptyData(orderPlan.roomType),
          interior: checkEmptyData(orderPlan.interior),
          cardPay: checkEmptyData(orderPlan.card),
          medhicalLoan: checkEmptyData(orderPlan.loan),
          options: checkEmptyData(orderPlan.contract)
            ? {
                some: {
                  kind: "contractCancel",
                  price: {
                    gte: 0,
                  },
                },
              }
            : undefined,
          // machine:
          //   targetMachine.length > 0
          //     ? {
          //         some: {
          //           machineId: {
          //             in: targetMachine,
          //           },
          //         },
          //       }
          //     : undefined,
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
    const { excludeGender, excludeStaff, targetMachine } =
      await beforeGetPrices(orderPlan);

    const ans = await prisma.price.count({
      where: {
        partsId: checkEmptyData(orderPlan.parts),
        clinic: {
          staffGender: excludeStaff || undefined,
          roomType: checkEmptyData(orderPlan.roomType),
          interior: checkEmptyData(orderPlan.interior),
          cardPay: checkEmptyData(orderPlan.card),
          medhicalLoan: checkEmptyData(orderPlan.loan),
          options: checkEmptyData(orderPlan.contract)
            ? {
                some: {
                  kind: "contractCancel",
                  price: {
                    gte: 0,
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
    excludeGender?: number
  ): Promise<PriceDto[]> => {
    // const table = await aboutCategoryRepository.getPriceTableName(aboutId);
    // const data = selectPriceClass(table);
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
    const res = price as PriceDto[];
    return res;
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

  return { getAllPrices, getCountMaxPlan, getPriceByClinic, getPriceOrderPlan };
};
