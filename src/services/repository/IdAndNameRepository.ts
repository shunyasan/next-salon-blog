import { prisma } from "services/common/prisma";
import {
  aboutCategoryRepository,
  basePartsRepository,
  machineRepository,
  originCategoryRepository,
} from "services/common/repository";
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

  const getBySortSelected = async (
    aboutCategoryId: string,
    partsId?: string
  ): Promise<IdAndNameDto[]> => {
    const parts = await basePartsRepository.getAllIdAndNameById(
      aboutCategoryId
    );
    if (!partsId) {
      return parts;
    }
    const sortedAboutCategory = sortBySelectData(partsId, parts);
    return sortedAboutCategory;
  };

  const getIdfindBySkinColorAndHairType = async (
    skinColor?: string,
    hair?: string
  ): Promise<IdAndNameDto[]> => {
    const skin = skinColor ? selectSkinColor(skinColor) : 0;
    const hairType = hair && selectHairType(hair);
    const machines = await machineRepository.getIdfindBySkinColorAndHairType(
      skin,
      hairType
    );
    return machines;
  };

  const selectSkinColor = (skiColor: string) => {
    const func: any = {};
    func["白色"] = 1;
    func["薄茶色"] = 2;
    func["色黒"] = 3;
    const skinNumber = func[skiColor];
    if (!skinNumber) {
      throw new Error("対応不可の肌色です");
    }
    return skinNumber as number;
  };

  const selectHairType = (hair: string) => {
    const func: any = {};
    func["産毛"] = "soft";
    func["標準"] = "standard";
    func["太い"] = "hard";
    const changedHair = func[hair];
    if (!changedHair) {
      throw new Error("対応不可の毛の状態です");
    }
    return changedHair as string;
  };

  // const getBySortSelected = async (
  const getOriginBySortSelected = async (
    originCategoryId: string
  ): Promise<IdAndNameDto[]> => {
    const originCategories = await originCategoryRepository.getAllIdAndName();
    const sortedAboutCategory = sortBySelectData(
      originCategoryId,
      originCategories
    );
    return sortedAboutCategory;
  };

  return {
    getAllAboutCategoriesIdAndName,
    getBySortSelected,
    getIdfindBySkinColorAndHairType,
    getOriginBySortSelected,
  };
};
