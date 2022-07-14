import { Clinic } from "@prisma/client";
import { clinicAreaService, clinicService } from "services/service";
import {
  ClinicNestPriceDto,
  ClinicToClinicNestPriceDto,
} from "types/ClinicNestPriceDto";
import { PagenationParameter } from "types/PagenationParameterDto";
import { instagramService } from "./instagramService";
import { PriceService } from "./price-service";
import { ClinicRepository } from "./repository/clinicRepository";
import { twitterService } from "./twitterService";

export class ClinicService {
  constructor(
    private readonly clinicRepository: ClinicRepository,
    private readonly priceService: PriceService
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
