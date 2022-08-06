import { BasicCategory, Gender } from "@prisma/client";
import { prisma } from "services/common/prisma";

export const BasicCategoryRepository = () => {
  const getBasicCategoryByaboutId = async (
    aboutCategoryId: string
  ): Promise<BasicCategory[]> => {
    const data = await prisma.basicCategory.findMany({
      where: {
        aboutCategoryId: aboutCategoryId,
      },
    });
    return data;
  };

  const getBasicCategoryName = async (id: string) => {
    const data = await prisma.basicCategory.findFirst({
      select: { name: true },
      where: { id: id },
    });
    return data?.name;
  };

  return { getBasicCategoryByaboutId, getBasicCategoryName };
};
