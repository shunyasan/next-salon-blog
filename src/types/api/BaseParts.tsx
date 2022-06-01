import { AboutCategory } from "./AboutCategory";
import { Parts } from "./Parts";

export type BaseParts = {
  id: string;
  name: string;
  description: string;
  aboutCategoryId: string;
  gender: number;
  aboutCategory: AboutCategory;
  parts: Parts[];
};
