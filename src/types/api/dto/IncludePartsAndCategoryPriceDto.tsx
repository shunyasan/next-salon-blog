import { PriceDto } from "./PriceDto";
import { IdAndNameDto } from "./IdAndNameDto";

export type IncludePartsAndCategoryPriceDto = {
  originCategory: IdAndNameDto;
  aboutCategory: IdAndNameDto;
  baseParts: IdAndNameDto;
  prices: PriceDto[];
};
