import {
  Clinic,
  ClinicOpeningHours,
  Clinic_Machine,
  Option,
  Picture,
} from "@prisma/client";

export type RelationClinic = Clinic & {
  picture: Picture[];
  options: Option[];
  clinicOpeningHours: ClinicOpeningHours[];
  // machine?: Clinic_Machine[];
};
