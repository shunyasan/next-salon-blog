import { ClinicArea } from "./ClinicArea";
import { ClinicGroup } from "./ClinicGroupe";
import { ClinicOpeningHours } from "./ClinicOpeningHours";
import { ClinicOption } from "./ClinicOption";
import { Machine } from "./Machine";

export type Clinic = {
  id: string;
  interior: string;
  address: string;
  cardPay: string;
  medhicalLoan: string;
  name: string;
  nearestStation: string;
  reserve: string;
  review: number;
  roomType: string;
  staffGender: number;
  tax: string;
  tel: string;
  url: string;
  areaId: string;
  clinicGroupId: string;
  clinicGroup: ClinicGroup;
  area: ClinicArea;
  machines: Machine[];
  clinicOpeningHours: ClinicOpeningHours[];
  clinicOption: ClinicOption;
};
