import { Gender } from "@prisma/client";
import { prisma } from "services/common/prisma";
import { IdAndNameDto } from "types/IdAndNameDto";

export class AboutCategoryRepository {
  // constructor(private readonly prisma = prisma.aboutCategory) {}

  async getAboutCategoryNameById(id: string) {
    const data = await prisma.aboutCategory.findFirst({
      select: { name: true },
      where: { id: id },
    });
    return data?.name;
  }

  async getAllAboutCategory() {
    return await prisma.aboutCategory.findMany();
  }

  async getAboutCategoryById(id: string) {
    const ans = await prisma.aboutCategory.findFirst({ where: { id: id } });
    if (!ans) {
      throw new Error();
    }
    return ans;
  }

  // // async getPriceTableName(id: string): Promise<string> {
  // //   const getTableName = await prisma.aboutCategory.findFirst({
  // //     select: { tableName: true },
  // //     where: { id: id },
  // //   });
  // //   if (!getTableName) {
  // //     throw new Error();
  // //   }
  // //   return getTableName.tableName;
  // // }

  // async getAllPriceTableName(originId: string): Promise<string[]> {
  //   const getTableName = await prisma.aboutCategory.findMany({
  //     select: { tableName: true },
  //     where: { originId: originId },
  //   });
  //   const data = getTableName.map((res) => res.tableName);
  //   return data;
  // }

  async getAllAboutCategoryByOriginId(originId: string) {
    const data = await prisma.aboutCategory.findMany({
      where: { originId: originId },
      orderBy: [{ id: "asc" }],
    });
    return data;
  }

  async getAboutCategoryByOriginIdAndPrice(originId: string, clinicId: string) {
    const data = await prisma.aboutCategory.findMany({
      where: {
        originId: originId,
        basicCategory: {
          some: {
            baseParts: {
              some: {
                parts: {
                  some: {
                    parts: {
                      price: {
                        some: {
                          clinicId: clinicId,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: [{ id: "asc" }],
    });
    return data;
  }

  async getJoinBasicParts(originId: string) {
    const data = await prisma.aboutCategory.findMany({
      include: {
        basicCategory: true,
      },
      where: { originId: originId },
      orderBy: [{ id: "asc" }],
    });
    return data;
  }

  async getAllIdAndNameById(id: string): Promise<IdAndNameDto[]> {
    return await prisma.aboutCategory.findMany({
      select: { id: true, name: true },
      where: { originId: id },
    });
  }

  async getIdAndName(id: string): Promise<IdAndNameDto> {
    const get = await prisma.aboutCategory.findFirst({
      select: { id: true, name: true },
      where: { id: id },
    });
    const change = get as IdAndNameDto;
    return change;
  }
}
