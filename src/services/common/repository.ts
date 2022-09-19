import { AboutCategoryRepository } from "../repository/aboutCategoryRepository";
import { BasePartsRepository } from "../repository/basePartsRepository";
import { ClinicAreaRepository } from "../repository/clinicAreaRepository";
import { ClinicRepository } from "../repository/clinicRepository";
import { OriginCategoryRepository } from "../repository/originCategoryRepository";

export const aboutCategoryRepository = new AboutCategoryRepository();
export const basePartsRepository = new BasePartsRepository();
export const clinicAreaRepository = new ClinicAreaRepository();
export const clinicRepository = new ClinicRepository();
export const originCategoryRepository = new OriginCategoryRepository();
