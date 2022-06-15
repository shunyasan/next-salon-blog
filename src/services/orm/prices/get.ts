import { prisma } from "services/prisma";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
import { IncludePartsAndCategoryPriceDto } from "types/api/dto/IncludePartsAndCategoryPriceDto";
import { PagenationParameter } from "types/api/dto/PagenationParameterDto";
import { PriceDto } from "types/api/dto/PriceDto";
import { OrderPlan } from "types/app/OrderPlan";
import { MachineService } from "../machine/get";
import { AboutCategoryRepository } from "../repository/aboutCategoryRepository";
import { BasePartsRepository } from "../repository/basePartsRepository";
import { OriginCategoryRepository } from "../repository/originCategoryRepository";

export class PriceService {
  constructor(
    private readonly originCategoryRepository = new OriginCategoryRepository(),
    private readonly aboutCategoryRepository = new AboutCategoryRepository(),
    private readonly basePartsRepository = new BasePartsRepository(),
    private readonly machineService = new MachineService()
  ) {}

  async getAllPrices(
    orderPlan: OrderPlan,
    // tableName: string,
    orderBy?: string,
    take?: number,
    skip?: number
  ) {
    const excludeGender: number = orderPlan.gender === "男性" ? 1 : 2;
    const tableName = await this.aboutCategoryRepository.getPriceTableName(
      orderPlan.AboutCategory
    );

    // let query = this.selectPriceJoinClinicQueryBuilder(
    //   tableName,
    //   excludeGender
    // );

    //テスト用
    const machines = await this.machineService.getIdfindBySkinColorAndHairType(
      orderPlan.skinCollor,
      orderPlan.hair
    );
    const targetMachine =
      machines.length > 0 ? machines.map((data) => `'${data.id}'`) : [];

    const data = this.selectPriceClass(tableName);
    const ans = await data.findMany({
      // const ans = {
      include: {
        clinic: {
          include: {
            clinicOption: true,
            clinicOpeningHours: true,
            machine:
              machines.length > 0
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
        partsId:
          orderPlan.parts && orderPlan.parts !== ""
            ? orderPlan.parts
            : undefined,
        clinic: {
          staffGender: orderPlan.staff || undefined,
          roomType:
            orderPlan.roomType && orderPlan.roomType !== ""
              ? orderPlan.roomType
              : undefined,
          interior:
            orderPlan.interior && orderPlan.interior !== ""
              ? orderPlan.interior
              : undefined,
          cardPay:
            orderPlan.card && orderPlan.card !== ""
              ? orderPlan.card
              : undefined,
          medhicalLoan:
            orderPlan.loan && orderPlan.loan !== ""
              ? orderPlan.loan
              : undefined,
          clinicOption: {
            contractCancellation:
              orderPlan.contract && orderPlan.contract !== ""
                ? orderPlan.contract
                : undefined,
          },
        },
      },
      take: take,
      skip: skip,
      orderBy: {
        oncePrice: orderBy === "oncePrice" ? "asc" : undefined,
        price: orderBy === "price" ? "asc" : undefined,
      },
    });

    // query += `AND "Machine"."id" IN (${targetMachine})`;

    // if (orderPlan.parts && orderPlan.parts !== "") {
    //   query += ` AND "${tableName}"."partsId" = '${orderPlan.parts}'`;
    // }
    // if (
    //   (orderPlan.skinCollor && orderPlan.skinCollor !== "") ||
    //   (orderPlan.hair && orderPlan.skinCollor !== "")
    // ) {
    //   const machines =
    //     await this.machineService.getIdfindBySkinColorAndHairType(
    //       orderPlan.skinCollor,
    //       orderPlan.hair
    //     );
    //   if (machines.length > 0) {
    //     const targetMachine = machines.map((data) => `'${data.id}'`);
    //     query += `AND "Machine"."id" IN (${targetMachine})`;
    //   }
    // }

    // if (orderPlan.roomType && orderPlan.roomType !== "") {
    //   query += ` AND "Clinic"."roomType" = '${orderPlan.roomType}'`;
    // }
    // if (orderPlan.interior && orderPlan.interior !== "") {
    //   query += ` AND "Clinic"."interior" = '${orderPlan.interior}'`;
    // }
    // if (orderPlan.staff) {
    //   query += ` AND "Clinic"."staffGender" = ${orderPlan.staff}`;
    // }
    // if (orderPlan.card && orderPlan.card !== "") {
    //   query += ` AND "Clinic"."cardPay" like '%${orderPlan.card}%'`;
    // }
    // if (orderPlan.loan && orderPlan.loan !== "") {
    //   query += ` AND "Clinic"."medhicalLoan" like '%${orderPlan.loan}%'`;
    // }
    // if (orderPlan.contract && orderPlan.contract !== "") {
    //   query += ` AND "ClinicOption"."contractCancellation" like '%${orderPlan.contract}%'`;
    // }
    // if (orderPlan.option) {
    //   for (const data of orderPlan.option) {
    //     query.andWhere(`clinic.${data} = :x_option `, {
    //       x_option: '無料',
    //     });
    //   }
    // }
    return ans;
  }

  async getPriceByClinic(
    clinicId: string,
    aboutId: string
  ): Promise<PriceDto[]> {
    const table = await this.aboutCategoryRepository.getPriceTableName(aboutId);
    const data = this.selectPriceClass(table);
    const price = await data.findMany({
      where: { clinicId: clinicId },
    });
    const res = price as PriceDto[];
    return res;
  }

  async getPriceOrderPlan(
    orderPlan: OrderPlan,
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

  async getCountMaxPlan(orderPlan: OrderPlan): Promise<number> {
    const tableName = await this.aboutCategoryRepository.getPriceTableName(
      orderPlan.AboutCategory
    );
    const machines = await this.machineService.getIdfindBySkinColorAndHairType(
      orderPlan.skinCollor,
      orderPlan.hair
    );
    const targetMachine =
      machines.length > 0 ? machines.map((data) => `'${data.id}'`) : [];

    const data = this.selectPriceClass(tableName);
    const ans = await data.count({
      // const ans = {
      // include: {
      //   clinic: {
      //     include: {
      //       machine: {
      //         where: {
      //           machineId: {
      //             in: targetMachine,
      //           },
      //         },
      //       },
      //     },
      //   },
      // },
      where: {
        partsId:
          orderPlan.parts && orderPlan.parts !== ""
            ? orderPlan.parts
            : undefined,
        clinic: {
          staffGender: orderPlan.staff || undefined,
          roomType:
            orderPlan.roomType && orderPlan.roomType !== ""
              ? orderPlan.roomType
              : undefined,
          interior:
            orderPlan.interior && orderPlan.interior !== ""
              ? orderPlan.interior
              : undefined,
          cardPay:
            orderPlan.card && orderPlan.card !== ""
              ? orderPlan.card
              : undefined,
          medhicalLoan:
            orderPlan.loan && orderPlan.loan !== ""
              ? orderPlan.loan
              : undefined,
          clinicOption: {
            contractCancellation:
              orderPlan.contract && orderPlan.contract !== ""
                ? orderPlan.contract
                : undefined,
          },
        },
      },
    });
    // const count: any = await prisma.$queryRawUnsafe(
    //   `SELECT COUNT( "${tableName}"."id" ) FROM "${tableName}" ${query}`
    // );
    // return count[0].count;
    return ans;
  }

  async getPlanByClinicId(
    clinicId: string,
    pagenation?: PagenationParameter
  ): Promise<PriceDto[]> {
    const data = await prisma.priceFaceSet.findMany({
      where: { clinicId: clinicId },
      take: pagenation ? pagenation.take : 2,
      skip: pagenation ? pagenation.skip : 0,
    });
    const change = data as PriceDto[];
    return change;
  }

  selectPriceClass(table: string) {
    switch (table) {
      case "PriceUpperFace":
        return prisma.priceUpperFace;
      case "PriceLowerFace":
        return prisma.priceLowerFace;
      case "PriceFaceSet":
        return prisma.priceFaceSet;
      case "PriceArm":
        return prisma.priceArm;
      case "PriceLeg":
        return prisma.priceLeg;
      case "PriceLimb":
        return prisma.priceLimb;
      case "PriceFrontBody":
        return prisma.priceFrontBody;
      case "PriceBackBody":
        return prisma.priceBackBody;
      case "PriceBodySet":
        return prisma.priceBodySet;
      case "PriceVio":
        return prisma.priceVio;
      case "PriceVioSet":
        return prisma.priceVioSet;
      case "PriceAllBody":
        return prisma.priceAllBody;
      case "PriceSelect":
        return prisma.priceSelect;
      case "PriceTime":
        return prisma.priceTime;
      case "PriceRange":
        return prisma.priceRange;
      case "PriceUpperBody":
        return prisma.priceUpperBody;
      case "PriceLowerBody":
        return prisma.priceLowerBody;
      default:
        throw new Error(`not found price table at ${table}`);
    }
  }

  selectPriceJoinClinicQueryBuilder(table: string, excludeGender: number) {
    // const baseQuery = `SELECT * FROM ${table}`;
    const clinicJoin = `INNER JOIN "Clinic" ON "Clinic"."id" = "${table}"."clinicId" `;
    const optionJoin = `INNER JOIN "ClinicOption" ON "ClinicOption"."clinicId" = "Clinic"."id" `;
    const hourJoin = `INNER JOIN "ClinicOpeningHours" ON "ClinicOpeningHours"."clinicId" = "Clinic"."id" `;
    const machineJoin = `INNER JOIN "Clinic_Machine" ON "Clinic_Machine"."clinicId" = "Clinic"."id" `;
    const machineRelation = `INNER JOIN "Machine" ON "Machine"."id" = "Clinic_Machine"."machineId" `;
    const partsJoin = `INNER JOIN "Parts" ON "Parts"."id" = "${table}"."partsId" `;
    const partsRelation = `INNER JOIN "BaseParts_Parts" ON "BaseParts_Parts"."partsId" = "Parts"."id" `;
    const baseJoin = `INNER JOIN "BaseParts" ON "BaseParts"."id" = "BaseParts_Parts"."basePartsId" `;
    const gender = `WHERE NOT "BaseParts"."gender" = ${excludeGender} `;
    return (
      clinicJoin +
      optionJoin +
      hourJoin +
      machineJoin +
      machineRelation +
      partsJoin +
      partsRelation +
      baseJoin +
      gender
    );
  }
}
