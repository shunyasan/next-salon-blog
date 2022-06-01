import { Clinic } from "./Clinic";

export type ClinicOption = {
  id: string;
  irradiationLeakage: string;
  aftercare: string;
  anesthesia: string;
  campaign: string;
  contractCancellation: string;
  firstVisitFees: string;
  subsequentVisitFees: string;
  shaving: string;
  studentDiscount: string;
  troubleTreatment: string;
  clinic: Clinic;
};
