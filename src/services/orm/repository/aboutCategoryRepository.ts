import { AboutCategory, PrismaClient } from "@prisma/client";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";

export class AboutCategoryRepository {
  constructor(private readonly prisma = new PrismaClient().aboutCategory) {}

  // 例
  // async getAll(): Promise<AboutCategory[]> {
  //   return await this.prisma.aboutCategory.findMany();
  // }

  async getAllAboutCategory(): Promise<AboutCategory[]> {
    return await this.prisma.findMany();
  }

  async getAboutCategoryById(id: string): Promise<AboutCategory> {
    const ans = await this.prisma.findFirst({ where: { id: id } });
    if (!ans) {
      throw new Error();
    }
    return ans;
  }

  async getPriceTableName(id: string): Promise<string> {
    const getTableName = await this.prisma.findFirst({
      select: { tableName: true },
      where: { id: id },
    });
    if (!getTableName) {
      throw new Error();
    }
    return getTableName.tableName;
  }

  async getAllPriceTableName(originId: string): Promise<string[]> {
    const getTableName = await this.prisma.findMany({
      select: { tableName: true },
      where: { originId: originId },
    });
    const data = getTableName.map((res) => res.tableName);
    return data;
  }

  async getAllAboutCategoryByOriginId(
    originId: string
  ): Promise<AboutCategory[]> {
    const data = await this.prisma.findMany({
      where: { originId: originId },
      orderBy: [{ id: "asc" }],
    });
    return data;
  }

  async getAllIdAndNameById(id: string): Promise<IdAndNameDto[]> {
    return await this.prisma.findMany({
      select: { id: true, name: true },
      where: { originId: id },
    });
  }

  async getIdAndName(id: string): Promise<IdAndNameDto> {
    const get = await this.prisma.findFirst({
      select: { id: true, name: true },
      where: { id: id },
    });
    const change = get as IdAndNameDto;
    return change;
  }
}
