import { Clinic } from "@prisma/client";

export type FeatureViewData = {
  datas: Clinic[];
  title: string;
  description: string;
  path: string;
};
