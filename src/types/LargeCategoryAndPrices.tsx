import { AboutCategory, OriginCategory } from "@prisma/client";
import { PriceByAboutCategory } from "./PriceByAboutCategory";
import { PriceDto } from "./PriceDto";

export type LargeCategoryAndPrices = {
  originCategory: OriginCategory;
  priceByAboutCategories: PriceByAboutCategory[];
};
