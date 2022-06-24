import { OriginCategory } from "@prisma/client";
import { IdAndNameDto } from "types/IdAndNameDto";
import { PriceDto } from "types/PriceDto";
import { PriceService } from "./price-service";
import { OriginCategoryRepository } from "./repository/originCategoryRepository";

export class OriginCategoryService {
  constructor(
    private readonly originCategoryRepository: OriginCategoryRepository,
    private readonly priceService: PriceService
  ) {}
  async getAllIdAndName() {
    return await this.originCategoryRepository.getAllIdAndName();
  }

  async getAllOriginCategory() {
    return await this.originCategoryRepository.getAllOriginCategory();
  }

  async getOriginCategoryById(id: string) {
    return await this.originCategoryRepository.getOriginCategoryById(id);
  }

  async getAllRelationParts() {
    return await this.originCategoryRepository.getAllRelationParts();
  }

  async getBySortSelected(originCategoryId: string): Promise<IdAndNameDto[]> {
    const originCategories =
      await this.originCategoryRepository.getAllIdAndName();
    const sortedAboutCategory = this.sortBySelectData(
      originCategoryId,
      originCategories
    );
    return sortedAboutCategory;
  }

  async getOriginCategoryIdAndName(id: string): Promise<IdAndNameDto> {
    return this.originCategoryRepository.getIdAndName(id);
  }

  async getOriginJoinPrice(id: string) {
    const origin =
      await this.originCategoryRepository.getAllJoinAboutCategory();
    Promise.all(origin.map(async (data) => {}));
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
