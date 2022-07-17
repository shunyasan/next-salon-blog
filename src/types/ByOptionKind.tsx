import { Option } from "@prisma/client";

export type ByOptionKind = {
  leakage?: Option;
  aftercare?: Option;
  anesthesia?: Option;
  contractCancel?: Option;
  firstVisitFees?: Option;
  revisitFees?: Option;
  shaving?: Option;
  skinTrouble?: Option;
};
