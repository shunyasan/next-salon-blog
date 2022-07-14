import { OriginCategory } from "@prisma/client";
import { IdAndNameDto } from "types/IdAndNameDto";
import { LargeCategoryAndPrices } from "types/LargeCategoryAndPrices";
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

  mockOrigin = [
    { id: "Z000001", name: "顔", path: "" },
    { id: "Z000002", name: "四肢", path: "limb" },
    { id: "Z000003", name: "体幹", path: "body" },
    { id: "Z000004", name: "VIO", path: "vio" },
    { id: "Z000005", name: "全身", path: "all-body" },
    { id: "Z000006", name: "その他", path: "other" },
  ];

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
