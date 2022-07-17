import { AboutCategory } from "@prisma/client";
import { prisma } from "services/prisma";
import { IdAndNameDto } from "types/IdAndNameDto";
import { IncludePartsAndCategoryPriceDto } from "types/IncludePartsAndCategoryPriceDto";
import { PagenationParameter } from "types/PagenationParameterDto";
import { PriceDto } from "types/PriceDto";
import { OriginCategoryRepository } from "./repository/originCategoryRepository";
import { AboutCategoryRepository } from "./repository/aboutCategoryRepository";
import { BasePartsRepository } from "./repository/basePartsRepository";
import { MachineService } from "./machine-service";
import { PriceByAboutCategory } from "types/PriceByAboutCategory";
import { OrderPlanQuery } from "types/app/OrderPlanQuery";
import { ParsedUrlQuery } from "querystring";
import { OrderPlanIdNameService } from "services/app/orderPlanIdNameService";
import { SortPlan } from "types/app/SortPlan";

const { defaultSort } = OrderPlanIdNameService();

export class PriceService {
  constructor(
    private readonly originCategoryRepository: OriginCategoryRepository,
    private readonly aboutCategoryRepository: AboutCategoryRepository,
    private readonly basePartsRepository: BasePartsRepository,
    private readonly machineService: MachineService
  ) {}

  checkEmptyData(val?: string | string[]) {
    const data = val as string;
    if (data && data !== "" && data !== "none") {
      return data;
    }
  }

  chackSort = (value: string): SortPlan | undefined => {
    const { price_asc, price_desc, oncePrice_asc, oncePrice_desc, none } =
      defaultSort;

    switch (value) {
      case price_asc.id:
        return { column: "price", sort: "asc" };
      case price_desc.id:
        return { column: "price", sort: "desc" };
      case oncePrice_asc.id:
        return { column: "oncePrice", sort: "asc" };
      case oncePrice_desc.id:
        return { column: "oncePrice", sort: "desc" };
      default:
        return undefined;
    }
  };

  async beforeGetPrices(orderPlan: OrderPlanQuery) {
    const excludeGender: number = orderPlan.gender === "男性" ? 1 : 2;
    const excludeStaff: number = 0;
    // const excludeStaff: number = orderPlan.staff === "男性" ? 1 : 2;

    const machines = await this.machineService.getIdfindBySkinColorAndHairType(
      orderPlan.skinCollor,
      orderPlan.hair
    );
    const targetMachine =
      machines.length > 0 ? machines.map((data) => `'${data.id}'`) : [];

    const sort = this.chackSort(orderPlan.sort);
    return {
      excludeGender,
      excludeStaff,
      targetMachine,
      sort,
    };
  }

  async getAllPrices(
    orderPlan: OrderPlanQuery,
    // tableName: string,
    orderBy?: string,
    take?: number,
    skip?: number
  ) {
    const { excludeGender, excludeStaff, targetMachine, sort } =
      await this.beforeGetPrices(orderPlan);

    const ans = await prisma.price.findMany({
      // const ans = {
      include: {
        clinic: {
          include: {
            clinicOpeningHours: true,
            options: {
              distinct: ["kind"],
              orderBy: {
                price: "asc",
              },
            },
            machine:
              targetMachine.length > 0
                ? {
                    where: {
                      machineId: {
                        in: targetMachine,
                      },
                    },
                  }
                : false,
          },
        },
        parts: {
          include: {
            baseParts: true,
          },
        },
      },
      where: {
        partsId: this.checkEmptyData(orderPlan.parts),
        clinic: {
          staffGender: excludeStaff || undefined,
          roomType: this.checkEmptyData(orderPlan.roomType),
          interior: this.checkEmptyData(orderPlan.interior),
          cardPay: this.checkEmptyData(orderPlan.card),
          medhicalLoan: this.checkEmptyData(orderPlan.loan),
          // clinicOption: {
          //   contractCancellation: this.checkEmptyData(orderPlan.contract),
          // },
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
  }

  async getCountMaxPlan(orderPlan: OrderPlanQuery): Promise<number> {
    const { excludeGender, excludeStaff, targetMachine } =
      await this.beforeGetPrices(orderPlan);

    const ans = await prisma.price.count({
      where: {
        partsId: this.checkEmptyData(orderPlan.parts),
        clinic: {
          staffGender: excludeStaff || undefined,
          roomType: this.checkEmptyData(orderPlan.roomType),
          interior: this.checkEmptyData(orderPlan.interior),
          cardPay: this.checkEmptyData(orderPlan.card),
          medhicalLoan: this.checkEmptyData(orderPlan.loan),
          // clinicOption: {
          //   contractCancellation: this.checkEmptyData(orderPlan.contract),
          // },
          options: {
            every: {
              kind: "contractCancel",
              price: {
                gte: 0,
              },
            },
          },
        },
      },
    });

    return ans;
  }

  async getPriceByClinic(
    clinicId: string,
    aboutId: string,
    excludeGender?: number
  ): Promise<PriceDto[]> {
    // const table = await this.aboutCategoryRepository.getPriceTableName(aboutId);
    // const data = this.selectPriceClass(table);
    const price = await prisma.price.findMany({
      where: {
        clinicId: clinicId,
        gender: {
          not: excludeGender,
        },
      },
    });
    const res = price as PriceDto[];
    return res;
  }

  async getPricesForAboutCategory(
    clinicId: string,
    aboutCategory: AboutCategory,
    gender: string
  ): Promise<PriceByAboutCategory> {
    const excludeGender = gender === "男性" ? 1 : 2;

    const price = await this.getPriceByClinic(
      clinicId,
      aboutCategory.id,
      excludeGender
    );
    const data: PriceByAboutCategory = {
      aboutCategory: aboutCategory,
      prices: price,
    };
    return data;
  }

  async getPriceOrderPlan(
    orderPlan: OrderPlanQuery,
    pagenation: PagenationParameter
    // ↓に変更する可能性
    // pagenationOrderPlan: PagenationOrderPlan
  ) {
    if (!orderPlan) {
      return [];
    }
    const sortPrice = orderPlan.paySystem === "総額" ? "price" : "oncePrice";

    const getPrices = await this.getAllPrices(
      orderPlan,
      sortPrice,
      pagenation.take,
      pagenation.skip
    );
    return getPrices as PriceDto[];
  }

  async getPlanByClinicId(clinicId: string, pagenation?: PagenationParameter) {
    const data = await prisma.price.findMany({
      where: { clinicId: clinicId },
      take: pagenation ? pagenation.take : 2,
      skip: pagenation ? pagenation.skip : 0,
    });
    return data;
  }

  // selectPriceClass(table: string) {
  //   switch (table) {
  //     case "PriceUpperFace":
  //       return prisma.priceUpperFace;
  //     case "PriceLowerFace":
  //       return prisma.priceLowerFace;
  //     case "PriceFaceSet":
  //       return prisma.priceFaceSet;
  //     case "PriceArm":
  //       return prisma.priceArm;
  //     case "PriceLeg":
  //       return prisma.priceLeg;
  //     case "PriceLimb":
  //       return prisma.priceLimb;
  //     case "PriceFrontBody":
  //       return prisma.priceFrontBody;
  //     case "PriceBackBody":
  //       return prisma.priceBackBody;
  //     case "PriceBodySet":
  //       return prisma.priceBodySet;
  //     case "PriceVio":
  //       return prisma.priceVio;
  //     case "PriceVioSet":
  //       return prisma.priceVioSet;
  //     case "PriceAllBody":
  //       return prisma.priceAllBody;
  //     case "PriceSelect":
  //       return prisma.priceSelect;
  //     case "PriceTime":
  //       return prisma.priceTime;
  //     case "PriceRange":
  //       return prisma.priceRange;
  //     case "PriceUpperBody":
  //       return prisma.priceUpperBody;
  //     case "PriceLowerBody":
  //       return prisma.priceLowerBody;
  //     default:
  //       throw new Error(`not found price table at ${table}`);
  //   }
  // }
}
