import { Clinic, Area, Instagram, Twitter } from "@prisma/client";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";

export type ClinicPageProps = {
  area: Area[];
  clinics: ClinicNestPriceDto[];
  page: number;
  twitter: (Twitter & {
    clinic: Clinic;
  })[];
  instagram: (Instagram & {
    clinic: Clinic;
  })[];
};
