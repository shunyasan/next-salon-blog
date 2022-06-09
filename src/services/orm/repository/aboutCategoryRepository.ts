import { prisma } from "services/prisma";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";

export class AboutCategoryRepository {
  // constructor(private readonly prisma = prisma.aboutCategory) {}

  // 例
  // async getAll() {
  //   return await prisma.aboutCategory.aboutCategory.findMany();
  // }

  //削除予定
  getTest() {
    return prisma.aboutCategory;
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

  async getPriceTableName(id: string): Promise<string> {
    const getTableName = await prisma.aboutCategory.findFirst({
      select: { tableName: true },
      where: { id: id },
    });
    if (!getTableName) {
      throw new Error();
    }
    return getTableName.tableName;
  }

  async getAllPriceTableName(originId: string): Promise<string[]> {
    const getTableName = await prisma.aboutCategory.findMany({
      select: { tableName: true },
      where: { originId: originId },
    });
    const data = getTableName.map((res) => res.tableName);
    return data;
  }

  async getAllAboutCategoryByOriginId(originId: string) {
    const data = await prisma.aboutCategory.findMany({
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
