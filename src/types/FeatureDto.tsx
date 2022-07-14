import { RelationClinic } from "./RelationClinic";

export type FeatureDto = {
  anesthesia: RelationClinic[];
  installments: RelationClinic[];
  interior: RelationClinic[];
  privateRoom: RelationClinic[];
  sutudentDiscount: RelationClinic[];
  visitFee: RelationClinic[];
};
