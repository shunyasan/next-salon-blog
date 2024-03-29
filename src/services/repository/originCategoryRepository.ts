import { prisma } from "services/common/prisma";
import { IdAndNameDto } from "types/IdAndNameDto";

export class OriginCategoryRepository {
  // constructor(private readonly prisma = prisma.originCategory) {}

  //削除予定
  getTest() {
    return prisma.originCategory;
  }

  async getAllOriginCategory() {
    const data = await prisma.originCategory.findMany({
      orderBy: { id: "asc" },
    });
    return data;
  }

  async getOriginCategoryById(id: string) {
    const data = await prisma.originCategory.findFirst({
      where: {
        id: id,
      },
    });
    if (!data) {
      throw Error();
    }
    return data;
  }

  async getAllIdAndName(): Promise<IdAndNameDto[]> {
    const get = await prisma.originCategory.findMany({
      select: { id: true, name: true },
      orderBy: { id: "asc" },
    });
    return get;
  }

  async getIdAndNameByClinicId(clinicId: string): Promise<IdAndNameDto[]> {
    const get = await prisma.originCategory.findMany({
      select: { id: true, name: true },
      where: {
        aboutCategories: {
          some: {
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
        },
      },
      orderBy: { id: "asc" },
    });
    return get;
  }

  async getAllJoinAboutCategory() {
    const get = await prisma.originCategory.findMany({
      include: {
        aboutCategories: true,
      },
      orderBy: { id: "asc" },
    });
    return get;
  }

  async getIdAndName(id: string): Promise<IdAndNameDto> {
    const get = await prisma.originCategory.findFirst({
      select: { id: true, name: true },
      where: { id: id },
    });

    if (!get) {
      throw Error();
    }
    return get;
  }
}

export const getOriginCategoryNameById = async (id: string) => {
  const data = await prisma.originCategory.findFirst({
    select: { name: true },
    where: { id: id },
  });
  return data?.name;
};
