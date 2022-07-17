import { prisma } from "services/common/prisma";

export class ClinicAreaRepository {
  // constructor(private readonly prisma = prisma.clinicArea) {}

  async getAllClinicArea() {
    return prisma.area.findMany();
  }
}
