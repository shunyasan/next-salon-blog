import { AboutCategory, Price } from "@prisma/client";
import { PriceDto } from "./PriceDto";

export type PriceByAboutCategory = {
  aboutCategory: AboutCategory;
  prices: Price[];
};
