import { Clinic, ClinicOpeningHours, ClinicOption } from "@prisma/client";

export type FeatureDto = {
  anesthesia: (Clinic & {
    clinicOption: ClinicOption | null;
    clinicOpeningHours: ClinicOpeningHours[];
  })[];
  installments: (Clinic & {
    clinicOption: ClinicOption | null;
    clinicOpeningHours: ClinicOpeningHours[];
  })[];
  interior: (Clinic & {
    clinicOption: ClinicOption | null;
    clinicOpeningHours: ClinicOpeningHours[];
  })[];
  privateRoom: (Clinic & {
    clinicOption: ClinicOption | null;
    clinicOpeningHours: ClinicOpeningHours[];
  })[];
  sutudentDiscount: (Clinic & {
    clinicOption: ClinicOption | null;
    clinicOpeningHours: ClinicOpeningHours[];
  })[];
  visitFee: (Clinic & {
    clinicOption: ClinicOption | null;
    clinicOpeningHours: ClinicOpeningHours[];
  })[];
};
