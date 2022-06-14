import { Clinic } from "@prisma/client";
import {
  ClinicNestPriceDto,
  ClinicToClinicNestPriceDto,
} from "types/api/dto/ClinicNestPriceDto";
import { PagenationParameter } from "types/api/dto/PagenationParameterDto";
import { PriceService } from "../prices/get";
import { ClinicRepository } from "../repository/clinicRepository";

export class ClinicService {
  constructor(
    private readonly clinicRepository = new ClinicRepository(),
    private readonly priceService = new PriceService()
  ) {}

  async getAllClinics() {
    return this.clinicRepository.getAll();
  }

  async getAllClinicAndLimit(
    pagenation: PagenationParameter
  ): Promise<ClinicNestPriceDto[]> {
    const clinics = await this.clinicRepository.getAllClinicAndLimit(
      pagenation.take,
      pagenation.skip
    );
    const nestPrice = await Promise.all(
      clinics.map(async (data) => {
        const prices = await this.priceService.getPlanByClinicId(data.id);
        return ClinicToClinicNestPriceDto(data, prices);
      })
    );
    return nestPrice;
  }

  async getOneClinic(clinicId: string) {
    const clinic = await this.clinicRepository.getOneClinic(clinicId);
    // const prices = await this.priceService.getPlanByClinicId(clinic.id);
    // const nestPrice = ClinicNestPriceDto.ClinicToClinicNestPriceDto(
    //   clinic,
    //   prices,
    // );
    return clinic;
  }

  async getAllClinicByAreaId(
    areaId: string,
    pagenation: PagenationParameter
  ): Promise<ClinicNestPriceDto[]> {
    const clinics = await this.clinicRepository.getAllClinicByAreaId(
      areaId,
      pagenation.take,
      pagenation.skip
    );
    const nestPrice = await Promise.all(
      clinics.map(async (data) => {
        const prices = await this.priceService.getPlanByClinicId(data.id);
        return ClinicToClinicNestPriceDto(data, prices);
      })
    );
    return nestPrice;
  }
}
