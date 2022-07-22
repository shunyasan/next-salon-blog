import { Option } from "@prisma/client";

export type ByOptionKind = {
  leakage?: Option;
  aftercare?: Option;
  anesthesia?: Option;
  contract?: Option;
  firstVisitFees?: Option;
  revisitFees?: Option;
  shaving?: Option;
  skinTrouble?: Option;
};
