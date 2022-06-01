import { AboutCategory } from "../api/AboutCategory";

export type AboutCategoryByName = {
  face: AboutCategory[];
  limb: AboutCategory[];
  body: AboutCategory[];
  vio: AboutCategory[];
  allBody: AboutCategory[];
  other: AboutCategory[];
};
