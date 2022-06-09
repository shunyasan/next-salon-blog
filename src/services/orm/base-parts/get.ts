import { BaseParts } from "@prisma/client";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
import { BasePartsRepository } from "../repository/basePartsRepository";

export class BasePartsService {
  constructor(
    private readonly basePartsRepository = new BasePartsRepository()
  ) {}

  async getAllBaseParts() {
    return await this.basePartsRepository.getAllBaseParts();
  }

  async getBasePartsById(id: string) {
    return await this.basePartsRepository.getBasePartsById(id);
  }

  async getAllBasePartsIdAndName(
    aboutCategoryId: string
  ): Promise<IdAndNameDto[]> {
    return await this.basePartsRepository.getAllBasePartsIdAndName(
      aboutCategoryId
    );
  }

  async getAllBasePartsByAboutCategoryId(
    aboutCategoryId: string,
    gender?: string
  ) {
    return await this.basePartsRepository.getAllBasePartsByAboutCategoryId(
      aboutCategoryId,
      gender
    );
  }

  async getBySortSelected(
    aboutCategoryId: string,
    partsId?: string
  ): Promise<IdAndNameDto[]> {
    const parts = await this.basePartsRepository.getAllIdAndNameById(
      aboutCategoryId
    );
    if (!partsId) {
      return parts;
    }
    const sortedAboutCategory = this.sortBySelectData(partsId, parts);
    return sortedAboutCategory;
  }

  async getBasePartsIdAndName(id: string): Promise<IdAndNameDto> {
    return this.basePartsRepository.getIdAndName(id);
  }

  sortBySelectData(
    targetString: string,
    datas: IdAndNameDto[]
  ): IdAndNameDto[] {
    datas.forEach((data, int) => {
      if (data.id === targetString) {
        datas.splice(int, 1);
        datas.unshift(data);
      }
    });
    return datas;
  }
}
