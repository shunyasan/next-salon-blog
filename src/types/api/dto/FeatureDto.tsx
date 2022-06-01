import { Clinic } from "../Clinic";

export type FeatureDto = {
  anesthesia: Clinic[];
  installments: Clinic[];
  interior: Clinic[];
  privateRoom: Clinic[];
  sutudentDiscount: Clinic[];
  visitFee: Clinic[];
};
