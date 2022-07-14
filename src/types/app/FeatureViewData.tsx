import { Clinic } from "@prisma/client";
import { RelationClinic } from "types/RelationClinic";

export type FeatureViewData = {
  datas: RelationClinic[];
  title: string;
  description: string;
  path: string;
};
