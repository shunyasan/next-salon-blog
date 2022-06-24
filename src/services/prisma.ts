import { PrismaClient } from "@prisma/client";
import { ClinicService } from "./orm/clinic-service";

export const prisma = new PrismaClient();
