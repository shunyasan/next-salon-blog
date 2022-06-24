import { AboutCategoryRepository } from "./orm/repository/aboutCategoryRepository";
import { BasePartsRepository } from "./orm/repository/basePartsRepository";
import { ClinicAreaRepository } from "./orm/repository/clinicAreaRepository";
import { ClinicRepository } from "./orm/repository/clinicRepository";
import { MachineRepository } from "./orm/repository/machineRepository";
import { OriginCategoryRepository } from "./orm/repository/originCategoryRepository";

export const aboutCategoryRepository = new AboutCategoryRepository();
export const basePartsRepository = new BasePartsRepository();
export const clinicAreaRepository = new ClinicAreaRepository();
export const clinicRepository = new ClinicRepository();
export const machineRepository = new MachineRepository();
export const originCategoryRepository = new OriginCategoryRepository();
