import { PriceDto } from "./PriceDto";
import { IdAndNameDto } from "./IdAndNameDto";

// 消す予定
export type IncludePartsAndCategoryPriceDto = {
  originCategory: IdAndNameDto;
  aboutCategory: IdAndNameDto;
  baseParts: IdAndNameDto;
  prices: PriceDto[];
};
