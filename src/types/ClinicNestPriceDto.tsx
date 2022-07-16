import { PriceDto } from "./PriceDto";
import { RelationClinic } from "./RelationClinic";

export interface ClinicNestPriceDto {
  clinic: RelationClinic;
  prices: PriceDto[];
}

export const ClinicToClinicNestPriceDto = (
  clinic: RelationClinic,
  prices: PriceDto[]
): ClinicNestPriceDto => {
  const data: ClinicNestPriceDto = {
    clinic,
    prices,
  };
  return data;
};
