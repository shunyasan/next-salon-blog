import { ClinicArea } from "@prisma/client";
import { ClinicAreaRepository } from "../repository/clinicAreaRepository";

export class ClinicAreaService {
  constructor(
    private readonly clinicAreaRepository = new ClinicAreaRepository()
  ) {}

  async getAllClinicArea() {
    const areas = await this.clinicAreaRepository.getAllClinicArea();
    return areas;
  }
}
