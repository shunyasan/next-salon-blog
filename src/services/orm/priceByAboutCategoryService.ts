import { LargeCategoryAndPrices } from "types/LargeCategoryAndPrices";
import { PriceByAboutCategory } from "types/PriceByAboutCategory";
import { PriceService } from "./price-service";
import { AboutCategoryRepository } from "./repository/aboutCategoryRepository";
import { OriginCategoryRepository } from "./repository/originCategoryRepository";

export class PriceByAboutCategoryService {
  constructor(
    private readonly originCategoryRepository: OriginCategoryRepository,
    private readonly aboutCategoryRepository: AboutCategoryRepository,
    private readonly priceService: PriceService
  ) {}

  async getAllByClinic(originId: string, clinicId: string, gender: string) {
    const aboutCategory =
      await this.aboutCategoryRepository.getAllAboutCategoryByOriginId(
        originId
      );
    const prices = await Promise.all(
      aboutCategory.map(async (about) => {
        return await this.priceService.getPricesForAboutCategory(
          clinicId,
          about,
          gender
        );
        // const res: LargeCategoryAndPrices = {
        //   originCategory: origin,
        //   priceByAboutCategories: prices,
        // };
      })
    );
    return prices;

    // return origin;
    // return prices;
  }
}
