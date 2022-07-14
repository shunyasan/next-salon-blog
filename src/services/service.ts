import { TitleValueService } from "./app/titleValueService";
import { AboutCategoryService } from "./orm/aboutCategoryService";
import { BasePartsService } from "./orm/base-parts-service";
import { ClinicAreaService } from "./orm/clinic-area-service";
import { ClinicService } from "./orm/clinic-service";
import { FeatureService } from "./orm/feature-service";
import { IdAndNameService } from "./orm/id-and-name-service";
import { MachineService } from "./orm/machine-service";
import { OriginCategoryService } from "./orm/origin-category-service";
import { PriceService } from "./orm/price-service";
import { PriceByAboutCategoryService } from "./orm/priceByAboutCategoryService";
import { ClinicRepository } from "./orm/repository/clinicRepository";
import {
  aboutCategoryRepository,
  basePartsRepository,
  clinicAreaRepository,
  clinicRepository,
  machineRepository,
  originCategoryRepository,
} from "./repository";
// import { OrderPlanIdNameService } from "./app/orderPlanIdNameService";

export const aboutCategoryService = new AboutCategoryService(
  aboutCategoryRepository
);
export const basePartsService = new BasePartsService(basePartsRepository);
export const clinicAreaService = new ClinicAreaService(clinicAreaRepository);
export const machineService = new MachineService(machineRepository);
export const priceService = new PriceService(
  originCategoryRepository,
  aboutCategoryRepository,
  basePartsRepository,
  machineService
);
export const clinicService = new ClinicService(clinicRepository, priceService);
export const featureService = new FeatureService(
  clinicRepository,
  priceService
);
export const idAndNameService = new IdAndNameService(originCategoryRepository);
export const originCategoryService = new OriginCategoryService(
  originCategoryRepository,
  priceService
);
export const priceByAboutCategoryService = new PriceByAboutCategoryService(
  originCategoryRepository,
  aboutCategoryRepository,
  priceService
);

export const titleValueService = new TitleValueService();
// export const orderPlanIdNameService = new OrderPlanIdNameService();
