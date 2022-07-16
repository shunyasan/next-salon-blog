import {
  BaseParts_Parts,
  Clinic,
  ClinicOpeningHours,
  ClinicOption,
  Clinic_Machine,
  Parts,
  Price,
} from "@prisma/client";

// (Price & {
//   clinic: Clinic & {
//       clinicOption: ClinicOption | null;
//       clinicOpeningHours: ClinicOpeningHours[];
//       machine: Clinic_Machine[];
//   };
//   parts: Parts & {
//       ...;
//   };
export type PriceDto = Price & {
  clinic: Clinic & {
    clinicOption: ClinicOption | null;
    clinicOpeningHours: ClinicOpeningHours[];
    machine: Clinic_Machine[];
  };
  parts: Parts & {
    baseParts: BaseParts_Parts[];
  };
};
