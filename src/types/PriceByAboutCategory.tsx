import { AboutCategory } from "@prisma/client";
import { PriceDto } from "./PriceDto";

export type PriceByAboutCategory = {
  aboutCategory: AboutCategory;
  prices: PriceDto[];
};
