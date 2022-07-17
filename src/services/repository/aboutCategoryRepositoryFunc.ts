import { prisma } from "services/common/prisma";
import { IdAndNameDto } from "types/IdAndNameDto";

export const aboutCategoryRepositoryFunc = () => {
  const getAboutCategoryNameById = async (id: string) => {
    const data = await prisma.aboutCategory.findFirst({
      select: { name: true },
      where: { id: id },
    });
    return data?.name;
  };

  // 追加済み　インポート変えるだけ
  // const getAllAboutCategory = async () => {
  //   return await prisma.aboutCategory.findMany();
  // };

  // const getAboutCategoryById = async (id: string) => {
  //   const ans = await prisma.aboutCategory.findFirst({ where: { id: id } });
  //   if (!ans) {
  //     throw new Error();
  //   }
  //   return ans;
  // };

  // const getAllAboutCategoryByOriginId = async (originId: string) => {
  //   const data = await prisma.aboutCategory.findMany({
  //     where: { originId: originId },
  //     orderBy: [{ id: "asc" }],
  //   });
  //   return data;
  // };

  // const getJoinBasicParts = async (originId: string, excludeGender: number) => {
  //   const data = await prisma.aboutCategory.findMany({
  //     include: {
  //       baseParts: {
  //         where: {
  //           gender: {
  //             not: excludeGender,
  //           },
  //         },
  //       },
  //     },
  //     where: { originId: originId },
  //     orderBy: [{ id: "asc" }],
  //   });
  //   return data;
  // };

  // const getAllIdAndNameById = async (id: string): Promise<IdAndNameDto[]> => {
  //   return await prisma.aboutCategory.findMany({
  //     select: { id: true, name: true },
  //     where: { originId: id },
  //   });
  // };

  // const getIdAndName = async (id: string): Promise<IdAndNameDto> => {
  //   const get = await prisma.aboutCategory.findFirst({
  //     select: { id: true, name: true },
  //     where: { id: id },
  //   });
  //   const change = get as IdAndNameDto;
  //   return change;
  // };

  return {
    getAboutCategoryNameById,
    // getAllAboutCategory,
    // getAboutCategoryById,
    // getAllAboutCategoryByOriginId,
    // getJoinBasicParts,
    // getAllIdAndNameById,
    // getIdAndName,
  };
};
