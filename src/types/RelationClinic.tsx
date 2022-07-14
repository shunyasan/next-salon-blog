import {
  Clinic,
  ClinicOpeningHours,
  ClinicOption,
  Picture,
} from "@prisma/client";

export type RelationClinic = Clinic & {
  picture: Picture[];
  clinicOption: ClinicOption | null;
  clinicOpeningHours: ClinicOpeningHours[];
};
