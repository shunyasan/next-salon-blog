import { Clinic } from "./Clinic";

export type ClinicGroup = {
  id: string;
  exampleClinic: string;
  groupName: string;
  clinic: Clinic[];
};
