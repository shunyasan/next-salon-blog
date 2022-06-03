import { BaseParts } from "types/api/BaseParts";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
import { getAxios } from "../get";

export async function getAllBaseParts(
  aboutCategoryId: string,
  partsId?: string
): Promise<IdAndNameDto[]> {
  const url =
    "base-parts/id-and-name/sort-selected?" +
    `aboutCategoryId=${aboutCategoryId}&`;

  const checkedUrl =
    !partsId || partsId === "none" ? url : url + `partsId=${partsId}&`;

  const data: IdAndNameDto[] = await getAxios(checkedUrl);
  return data;
}

export async function getAllBasePartsByAboutCategoryId(
  aboutCategoryId: string,
  gender: string
): Promise<BaseParts[]> {
  const query = "?gender=" + gender;
  const data: BaseParts[] = await getAxios(
    "base-parts/aboutCategoryId/" + aboutCategoryId + query
  );
  return data;
}

export async function getBasePartsIdAndName(id: string): Promise<IdAndNameDto> {
  const data: IdAndNameDto = await getAxios("base-parts/id-and-name/" + id);
  return data;
}
