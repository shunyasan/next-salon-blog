// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { featureValidation } from "services/app/features/feature";
import { ClinicNestPriceDto } from "types/api/dto/ClinicNestPriceDto";
import { FeatureDto } from "types/api/dto/FeatureDto";
import { getAxios } from "../get";
import { ClinicRepository } from "../repository/clinicRepository";

// const clinicRepository = new ClinicRepository();

export class FeatureService {
  constructor(
    // private readonly prisma = new PrismaClient(),
    private readonly clinicRepository = new ClinicRepository()
  ) {}

  async getAllFeature(): Promise<any> {
    const anesthesia = await this.clinicRepository.getFreeAnesthesia(
      10,
      0,
      true
    );
    const installments = await this.clinicRepository.getInstallments(
      10,
      0,
      true
    );
    const interior = await this.clinicRepository.getInterior(10, 0, true);
    const privateRoom = await this.clinicRepository.getPrivateRoom(10, 0, true);
    const sutudentDiscount = await this.clinicRepository.getSutudentDiscount(
      10,
      0,
      true
    );
    const visitFee = await this.clinicRepository.getVisitFee(10, 0, true);
    console.log(`visitFee: ${visitFee}`);
    const feature = {
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
}

export async function getFeature(
  feature: string,
  take: number,
  skip: number
): Promise<ClinicNestPriceDto[]> {
  const check =
    typeof feature === "string" ? featureValidation(feature) : undefined;
  if (!check) {
    throw new Error("featureがありません");
  }

  const query = `take=${take}&skip=${skip}`;
  const data: ClinicNestPriceDto[] = await getAxios(
    `feature/${feature}?` + query
  );
  return data;
}

export async function getCountFeature(feature: string): Promise<number> {
  const check =
    typeof feature === "string" ? featureValidation(feature) : undefined;
  if (!check) {
    throw new Error("featureがありません");
  }
  const data: number = await getAxios(`feature/count/${feature}`);
  return data;
}
