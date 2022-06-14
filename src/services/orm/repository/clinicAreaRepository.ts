import { prisma } from "services/prisma";

export class ClinicAreaRepository {
  // constructor(private readonly prisma = prisma.clinicArea) {}

  async getAllClinicArea() {
    return prisma.clinicArea.findMany();
  }
}
