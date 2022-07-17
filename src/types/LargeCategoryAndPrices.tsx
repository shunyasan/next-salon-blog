import { OriginCategory } from "@prisma/client";
import { PriceByAboutCategory } from "./PriceByAboutCategory";

export type LargeCategoryAndPrices = {
  originCategory: OriginCategory;
  priceByAboutCategories: PriceByAboutCategory[];
};
