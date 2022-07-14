import { prisma } from "services/prisma";
import { IdAndNameDto } from "types/IdAndNameDto";

export const aboutCategoryRepositoryFunc = () => {
  const getAboutCategoryNameById = async (id: string) => {
    const data = await prisma.aboutCategory.findFirst({
      select: { name: true },
      where: { id: id },
    });
    return data?.name;
  };

  return { getAboutCategoryNameById };
};
