import { NextApiRequest, NextApiResponse } from "next";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
import { OriginCategory } from "types/api/OriginCategory";
import { getAxios } from "../get";

export async function getAllOriginCategory(): Promise<OriginCategory[]> {
  const data: OriginCategory[] = await getAxios("origin-category");
  return data;
}

export async function getAllOriginCategoriesIdAndName(
  originCategoryId: string
): Promise<IdAndNameDto[]> {
  const url =
    "origin-category/id-and-name/sort-selected?" +
    `originCategoryId=${originCategoryId}&`;

  const data: IdAndNameDto[] = await getAxios(url);
  return data;
}

export async function getOriginCategoryIdAndName(
  id: string
): Promise<IdAndNameDto> {
  const data: IdAndNameDto = await getAxios(
    "origin-category/id-and-name/" + id
  );
  return data;
}
