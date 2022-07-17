import { useRouter } from "next/router";
import fetcher from "services/fetcher";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";
import { IdAndNameDto } from "types/IdAndNameDto";
import { OptionText } from "types/app/OptionText";

const noneValuePush = (): IdAndNameDto => {
  return { id: "none", name: "指定しない" };
};

const getOriginCategories = async (originId: string) => {
  const data: IdAndNameDto[] = await fetcher(
    "/api/origin-category/" + originId
  );
  return data;
};
const getAboutCategories = async (
  originCategoryId: string,
  aboutCategoryId?: string
) => {
  const origin = `originCategoryId=${originCategoryId}&`;
  const about = `aboutCategoryId=${aboutCategoryId}`;

  const data: IdAndNameDto[] = await fetcher(
    `/api/about-categories?${origin + about}`
  );
  return data;
};
const getBaseParts = async (aboutCategoryId?: string, partsId?: string) => {
  const about = `aboutCategoryId=${aboutCategoryId}&`;
  const part = `partsId=${partsId}&`;
  const data: IdAndNameDto[] = await fetcher(`/api/base-parts?${about + part}`);
  return data;
};

export const getResearchCardData = async (
  originId: string,
  aboutCategoryId?: string,
  partsId?: string
) => {
  const getOriginCategory = await getOriginCategories(originId);
  const getAboutCategory = await getAboutCategories(
    getOriginCategory[0].id,
    aboutCategoryId
  );
  const getParts = await getBaseParts(getAboutCategory[0].id, partsId);

  if (!partsId || partsId === "none") {
    getParts.unshift(noneValuePush());
  } else {
    getParts.push(noneValuePush());
  }

  return {
    originCategory: getOriginCategory,
    aboutCategory: getAboutCategory,
    parts: getParts,
  };
};

export const checkNoneValue = (val?: string | null) => {
  if (!val || val === "なし") {
    return "-";
  }
  return val;
};

export const newOptionFunc = (clinicAndPrice: ClinicNestPriceDto) => {
  const clinic = clinicAndPrice.clinic;

  const cardPay: OptionText = {
    name: "カード払い",
    text: checkNoneValue(clinic.cardPay),
  };
  const medhicalLoan: OptionText = {
    name: "医療ローン",
    text: checkNoneValue(clinic.medhicalLoan),
  };
  // const contractCancel: OptionText = {
  //   name: "途中解約",
  //   text: checkNoneValue(clinic.options.contractCancellation),
  // };
  return {
    payment: [cardPay, medhicalLoan],
  };
};
