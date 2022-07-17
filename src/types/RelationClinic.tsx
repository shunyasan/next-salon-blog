import { Clinic, ClinicOpeningHours, Option, Picture } from "@prisma/client";

export type RelationClinic = Clinic & {
  picture: Picture[];
  options: Option[];
  clinicOpeningHours: ClinicOpeningHours[];
};
