import { prisma } from "services/prisma";
import { aboutCategoryRepository } from "services/repository";
import { IdAndNameDto } from "types/IdAndNameDto";

export const IdAndNameRepository = () => {
  const sortBySelectData = (
    targetString: string,
    datas: IdAndNameDto[]
  ): IdAndNameDto[] => {
    datas.forEach((data, int) => {
      if (data.id === targetString) {
        datas.splice(int, 1);
        datas.unshift(data);
      }
    });
    return datas;
  };

  const getAllAboutCategoriesIdAndName = async (
    originCategoryId: string,
    aboutCategoryId: string
  ): Promise<IdAndNameDto[]> => {
    const aboutCategories = await aboutCategoryRepository.getAllIdAndNameById(
      originCategoryId
    );
    if (!aboutCategoryId) {
      return aboutCategories;
    }
    const sortedAboutCategory = sortBySelectData(
      aboutCategoryId,
      aboutCategories
    );
    return sortedAboutCategory;
  };

  return { getAllAboutCategoriesIdAndName };
};
