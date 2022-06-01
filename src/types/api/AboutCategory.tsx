import { BaseParts } from "./BaseParts";
import { OriginCategory } from "./OriginCategory";

export type AboutCategory = {
  id: string;
  name: string;
  imgUrlLady: string;
  imgUrlMen: string;
  set: boolean;
  tableName: string;
  originId: string;
  origin: OriginCategory;
  baseParts: BaseParts[];
};
