import {
  Clinic,
  ClinicOpeningHours,
  ClinicOption,
  Parts,
} from "@prisma/client";

export type PriceDto = {
  id: string;
  name: string;
  gender: number;
  times: number;
  price: number;
  oncePrice: number;
  description: string;
  partsId: string;
  clinicId: string;
  parts: Parts;
  clinic: Clinic & {
    clinicOption: ClinicOption;
    clinicOpeningHours: ClinicOpeningHours[];
  };
};
