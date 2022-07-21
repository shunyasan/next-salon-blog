import { Clinic, Area, Instagram, Twitter } from "@prisma/client";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";
import { RelationClinic } from "./RelationClinic";

export type ClinicPageProps = {
  area?: { id: string; data: Area[] };
  clinics: RelationClinic[];
  page: number;
  maxData: number;
  twitter: Twitter[];
  instagram: Instagram[];
};
