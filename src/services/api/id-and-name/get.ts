import { NextApiRequest, NextApiResponse } from "next";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
import { getAxios } from "../get";

export async function getAllOriginCategoryIdAndName(): Promise<IdAndNameDto[]> {
  const data: IdAndNameDto[] = await getAxios(`id-and-name/origin-category`);
  return data;
}

export async function getAllBasePartsIdAndName(
  aboutCategoryId: string
): Promise<IdAndNameDto[]> {
  const data: IdAndNameDto[] = await getAxios(
    "base-parts/id-and-name/aboutCategoryId/" + aboutCategoryId
  );
  return data;
}
