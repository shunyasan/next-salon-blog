import { PrismaClient } from "@prisma/client";
import { ClinicService } from "./orm/clinics/get";

export const prisma = new PrismaClient();
