import { NextApiRequest, NextApiResponse } from "next";
import { AboutCategory } from "types/api/AboutCategory";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
import { getAxios } from "../get";
import { AboutCategoryRepository } from "../repository/aboutCategoryRepository";

const aboutCategoryRepository = new AboutCategoryRepository();

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

export async function getAllAboutCategoriesIdAndName(
  originCategoryId: string,
  aboutCategoryId: string
): Promise<IdAndNameDto[]> {
  // const aboutCategories = await aboutCategoryRepository.getAllIdAndNameById(
  //   originCategoryId
  // );
  // if (!aboutCategoryId) {
  //   return aboutCategories;
  // }
  // const sortedAboutCategory = sortBySelectData(
  //   aboutCategoryId,
  //   aboutCategories
  // );
  // return sortedAboutCategory;

  // デフォルト
  const url =
    "about-category/id-and-name/sort-selected?" +
    `originCategoryId=${originCategoryId}&`;

  const checkedUrl =
    !aboutCategoryId || aboutCategoryId === "none"
      ? url
      : url + `aboutCategoryId=${aboutCategoryId}`;

  const data: IdAndNameDto[] = await getAxios(checkedUrl);
  return data;
}

export async function getAboutCategoryById(id: string): Promise<AboutCategory> {
  const data: AboutCategory = await getAxios("about-category/" + id);
  return data;
}

export async function getAboutCategoryByOriginId(
  originId: string
): Promise<AboutCategory[]> {
  const data: AboutCategory[] = await getAxios(
    "about-category/originId/" + originId
  );
  return data;
}

export async function getAboutCategoryIdAndName(
  id: string
): Promise<IdAndNameDto> {
  const data: IdAndNameDto = await getAxios("about-category/id-and-name/" + id);
  return data;
}
