import { useRouter } from "next/router";
import fetcher from "services/api/fetcher";
import { Clinic } from "types/api/Clinic";
import { ClinicOption } from "types/api/ClinicOption";
import { ClinicNestPriceDto } from "types/api/dto/ClinicNestPriceDto";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
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

export const checkNoneValue = (val: string) => {
  if (!val || val === "なし") {
    return "-";
  }
  return val;
};

export const newOptionFunc = (clinic: Clinic | ClinicNestPriceDto) => {
  const irradiation: OptionText = {
    name: "照射漏れ",
    text: checkNoneValue(clinic.clinicOption.irradiationLeakage),
  };
  const anesthesia: OptionText = {
    name: "麻酔",
    text: checkNoneValue(clinic.clinicOption.anesthesia),
  };
  const aftercare: OptionText = {
    name: "アフターケア",
    text: checkNoneValue(clinic.clinicOption.aftercare),
  };
  const shaving: OptionText = {
    name: "剃毛",
    text: checkNoneValue(clinic.clinicOption.shaving),
  };
  const trouble: OptionText = {
    name: "肌トラブル対応",
    text: checkNoneValue(clinic.clinicOption.troubleTreatment),
  };
  const firstVisit: OptionText = {
    name: "初診料",
    text: checkNoneValue(clinic.clinicOption.firstVisitFees),
  };
  const subsequentVisit: OptionText = {
    name: "再診料",
    text: checkNoneValue(clinic.clinicOption.subsequentVisitFees),
  };
  const studentDiscount: OptionText = {
    name: "学割",
    text: checkNoneValue(clinic.clinicOption.studentDiscount),
  };
  const cardPay: OptionText = {
    name: "カード払い",
    text: checkNoneValue(clinic.cardPay),
  };
  const medhicalLoan: OptionText = {
    name: "医療ローン",
    text: checkNoneValue(clinic.medhicalLoan),
  };
  const contractCancel: OptionText = {
    name: "途中解約",
    text: checkNoneValue(clinic.clinicOption.contractCancellation),
  };
  return {
    service: [irradiation, anesthesia, aftercare, shaving, trouble],
    medicalFee: [firstVisit, subsequentVisit, studentDiscount],
    payment: [cardPay, medhicalLoan, contractCancel],
  };
};

export const checkFreeOption = (option: ClinicOption) => {
  const func: any = {};
  func["irradiationLeakage"] = "照射漏れ";
  func["aftercare"] = "アフターケア";
  func["anesthesia"] = "麻酔";
  func["contractCancellation"] = "中途解約";
  func["firstVisitFees"] = "初診料";
  func["subsequentVisitFees"] = "再診料";
  func["shaving"] = "剃毛";
  func["troubleTreatment"] = "肌トラブル対応";

  const clinicData = Object.entries(option).map(([key, value]) => {
    if (typeof value === "string" && value.includes("無料")) {
      return key;
    } else {
      return null;
    }
  });

  let optionList: string = "";
  for (const data of clinicData) {
    if (data) {
      const checkOption = func[data];
      if (checkOption) {
        optionList += checkOption + "/ ";
      }
    }
  }
  return optionList === "" ? "不明" : optionList;
};
