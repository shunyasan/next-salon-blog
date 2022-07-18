import { Price } from "@prisma/client";
import { RelationClinic } from "./RelationClinic";

export interface ClinicNestPriceDto {
  clinic: RelationClinic;
  prices?: Price[];
}

export const ClinicToClinicNestPriceDto = (
  clinic: RelationClinic,
  prices: Price[]
): ClinicNestPriceDto => {
  const data: ClinicNestPriceDto = {
    clinic,
    prices,
  };
  return data;
};
