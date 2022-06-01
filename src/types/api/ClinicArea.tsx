import { Clinic } from "./Clinic";

export type ClinicArea = {
  id: string;
  area: string;
  description: string;
  registrationNumber: number;
  clinic: Clinic[];
};
