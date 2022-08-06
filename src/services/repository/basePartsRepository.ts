import { Gender } from "@prisma/client";
import { prisma } from "services/common/prisma";
import { IdAndNameDto } from "types/IdAndNameDto";

export class BasePartsRepository {
  // constructor(private readonly prisma = prisma.baseParts) {}

  async getAllBaseParts() {
    return prisma.baseParts.findMany();
  }

  async getBasePartsById(id: string) {
    const data = await prisma.baseParts.findFirst({ where: { id: id } });
    if (!data) {
      throw Error();
    }
    return data;
  }

  // async getAllBasePartsIdAndName(
  //   aboutCategoryId: string
  // ): Promise<IdAndNameDto[]> {
  //   const data = await prisma.baseParts.findMany({
  //     select: { id: true, name: true },
  //     where: { aboutCategoryId: aboutCategoryId },
  //   });
  //   return data;
  // }

  async getAllBasePartsByAboutId(aboutCategoryId: string) {
    const data = await prisma.baseParts.findMany({
      where: {
        basicCategory: {
          aboutCategoryId: aboutCategoryId,
        },
      },
    });
    return data;
  }

  async getAllIdAndNameById(id: string): Promise<IdAndNameDto[]> {
    return await prisma.baseParts.findMany({
      select: { id: true, name: true },
      where: {
        basicCategory: {
          aboutCategoryId: id,
        },
      },
    });
  }

  async getAllBasePartsByAboutCategoryId(id: string) {
    return await prisma.baseParts.findMany({
      where: {
        basicCategory: {
          aboutCategoryId: id,
        },
      },
    });
  }

  async getIdAndName(id: string): Promise<IdAndNameDto> {
    const get = await prisma.baseParts.findFirst({
      select: { id: true, name: true },
      where: { id: id },
    });
    const change = get as IdAndNameDto;
    return change;
  }
}
