import { Clinic } from "./Clinic";

export type ClinicOpeningHours = {
  id: string;
  startHours: string;
  endHours: string;
  description: string;
  mon: boolean;
  thu: boolean;
  wed: boolean;
  thir: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
  hol: boolean;
  clinicId: string;
  clinic: Clinic;
};
