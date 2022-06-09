import { AboutCategory } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
import { AboutCategoryRepository } from "../repository/aboutCategoryRepository";

export class AboutCategoryService {
  constructor(
    private readonly aboutCategoryRepository = new AboutCategoryRepository()
  ) {}

  sortBySelectData = (
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

  async getAllAboutCategoriesIdAndName(
    originCategoryId: string,
    aboutCategoryId: string
  ): Promise<IdAndNameDto[]> {
    const aboutCategories =
      await this.aboutCategoryRepository.getAllIdAndNameById(originCategoryId);
    if (!aboutCategoryId) {
      return aboutCategories;
    }
    const sortedAboutCategory = this.sortBySelectData(
      aboutCategoryId,
      aboutCategories
    );
    return sortedAboutCategory;
  }

  // return sortedAboutCategory;

  // デフォルト
  // const url =
  //   "about-category/id-and-name/sort-selected?" +
  //   `originCategoryId=${originCategoryId}&`;

  // const checkedUrl =
  //   !aboutCategoryId || aboutCategoryId === "none"
  //     ? url
  //     : url + `aboutCategoryId=${aboutCategoryId}`;

  // const data: IdAndNameDto[] = await getAxios(checkedUrl);
  // return data;

  async getAboutCategoryById(id: string) {
    return await this.aboutCategoryRepository.getAboutCategoryById(id);

    // デフォルト
    // const data: AboutCategory = await getAxios("about-category/" + id);
    // return data;
  }

  async getAboutCategoryByOriginId(originId: string) {
    return await this.aboutCategoryRepository.getAllAboutCategoryByOriginId(
      originId
    );

    // デフォルト
    // const data: AboutCategory[] = await getAxios(
    //   "about-category/originId/" + originId
    //   );
    //   return data;
  }

  async getAboutCategoryIdAndName(id: string): Promise<IdAndNameDto> {
    return this.aboutCategoryRepository.getIdAndName(id);

    //デフォルト
    // const data: IdAndNameDto = await getAxios("about-category/id-and-name/" + id);
    // return data;
  }
}
