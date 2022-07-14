// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Clinic, ClinicOpeningHours, ClinicOption } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { featureValidation } from "services/app/features/feature";
import {
  ClinicNestPriceDto,
  ClinicToClinicNestPriceDto,
} from "types/ClinicNestPriceDto";
import { FeatureDto } from "types/FeatureDto";
import { PagenationParameter } from "types/PagenationParameterDto";
import { RelationClinic } from "types/RelationClinic";
import { PriceService } from "./price-service";
import { ClinicRepository } from "./repository/clinicRepository";

// const clinicRepository = new ClinicRepository();

export class FeatureService {
  constructor(
    private readonly clinicRepository: ClinicRepository,
    private readonly priceService: PriceService
  ) {}

  async getAllFeature() {
    const anesthesia: RelationClinic[] =
      await this.clinicRepository.getFreeAnesthesia(10, 0, true);
    const installments: RelationClinic[] =
      await this.clinicRepository.getInstallments(10, 0, true);
    const interior: RelationClinic[] = await this.clinicRepository.getInterior(
      10,
      0,
      true
    );
    const privateRoom: RelationClinic[] =
      await this.clinicRepository.getPrivateRoom(10, 0, true);
    const sutudentDiscount: RelationClinic[] =
      await this.clinicRepository.getSutudentDiscount(10, 0, true);
    const visitFee: RelationClinic[] = await this.clinicRepository.getVisitFee(
      10,
      0,
      true
    );
    const feature: FeatureDto = {
      anesthesia,
      installments,
      interior,
      privateRoom,
      sutudentDiscount,
      visitFee,
    };
    return feature;

    // デフォルト
    // const data = await getAxios("feature");
    // return data;
  }

  async getFeature(
    feature: string,
    pagenation: PagenationParameter
  ): Promise<ClinicNestPriceDto[]> {
    const clinics = await this.checkFeatureFunc(
      feature,
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

  async getCountFeature(feature: string): Promise<number> {
    const count = await this.checkCountFeatureFunc(feature);
    return count;
  }

  async checkCountFeatureFunc(feature: string): Promise<number> {
    const func: any = {};
    func["anesthesia"] = await this.clinicRepository.getCountFreeAnesthesia();
    func["installments"] = await this.clinicRepository.getCountInstallments();
    func["interior"] = await this.clinicRepository.getCountInterior();
    func["privateRoom"] = await this.clinicRepository.getCountPrivateRoom();
    func["sutudentDiscount"] =
      await this.clinicRepository.getCountSutudentDiscount();
    func["visitFee"] = await this.clinicRepository.getCountVisitFee();
    const getFunc: number = func[feature];
    if (!getFunc) {
      throw new Error();
    }
    return getFunc;
  }

  async checkFeatureFunc(feature: string, take: number, skip: number) {
    switch (feature) {
      case "anesthesia":
        return this.clinicRepository.getFreeAnesthesia(take, skip);
      case "installments":
        return this.clinicRepository.getInstallments(take, skip);
      case "interior":
        return this.clinicRepository.getInterior(take, skip);
      case "privateRoom":
        return this.clinicRepository.getPrivateRoom(take, skip);
      case "sutudentDiscount":
        return this.clinicRepository.getSutudentDiscount(take, skip);
      case "visitFee":
        return this.clinicRepository.getVisitFee(take, skip);
      default:
        throw new Error();
    }
  }
}
