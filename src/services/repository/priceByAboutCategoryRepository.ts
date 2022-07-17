import { AboutCategory } from "@prisma/client";
import { prisma } from "services/common/prisma";
import { aboutCategoryRepository } from "services/common/repository";
import { PriceByAboutCategory } from "types/PriceByAboutCategory";
import { priceDtoRepository } from "./priceDtoRepository";

const { getPriceByClinic } = priceDtoRepository();

export const priceByAboutCategoryRepository = () => {
  // constructor(private readonly prisma = prisma.clinicArea) {}

  const getAllByClinic = async (
    originId: string,
    clinicId: string,
    gender: string
  ) => {
    const aboutCategory =
      await aboutCategoryRepository.getAllAboutCategoryByOriginId(originId);
    const prices = await Promise.all(
      aboutCategory.map(async (about) => {
        return await getPricesForAboutCategory(clinicId, about, gender);
        // const res: LargeCategoryAndPrices = {
        //   originCategory: origin,
        //   priceByAboutCategories: prices,
        // };
      })
    );
    return prices;
  };

  const getPricesForAboutCategory = async (
    clinicId: string,
    aboutCategory: AboutCategory,
    gender: string
  ): Promise<PriceByAboutCategory> => {
    const excludeGender = gender === "男性" ? 1 : 2;

    const price = await getPriceByClinic(
      clinicId,
      aboutCategory.id,
      excludeGender
    );
    const data: PriceByAboutCategory = {
      aboutCategory: aboutCategory,
      prices: price,
    };
    return data;
  };

  return { getAllByClinic, getPricesForAboutCategory };
};
