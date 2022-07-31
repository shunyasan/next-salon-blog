import {
  BaseParts_Parts,
  Clinic,
  ClinicOpeningHours,
  Clinic_Machine,
  Option,
  Parts,
  Price,
} from "@prisma/client";
import { RelationClinic } from "./RelationClinic";

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
  clinic: RelationClinic;
};
