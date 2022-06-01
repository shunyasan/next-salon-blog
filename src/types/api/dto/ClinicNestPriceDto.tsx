import { Clinic } from "../Clinic";
import { ClinicOpeningHours } from "../ClinicOpeningHours";
import { ClinicOption } from "../ClinicOption";
import { PriceDto } from "./PriceDto";

export interface ClinicNestPriceDto extends Clinic {
  prices: PriceDto[];
}
