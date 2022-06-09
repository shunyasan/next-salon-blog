import { Clinic, ClinicOpeningHours, ClinicOption } from "@prisma/client";
import { PriceDto } from "./PriceDto";

export interface ClinicNestPriceDto extends Clinic {
  clinicOption: ClinicOption | null;
  clinicOpeningHours: ClinicOpeningHours[];
  prices: PriceDto[];
}

export const ClinicToClinicNestPriceDto = (
  clinic: Clinic & {
    clinicOption: ClinicOption | null;
    clinicOpeningHours: ClinicOpeningHours[];
  },
  prices: PriceDto[]
): ClinicNestPriceDto => {
  const priceHash = { prices };
  const data: ClinicNestPriceDto = Object.assign(clinic, priceHash);
  return data;
};
