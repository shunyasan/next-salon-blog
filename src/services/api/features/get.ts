// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { featureValidation } from "services/app/features/feature";
import { ClinicNestPriceDto } from "types/api/dto/ClinicNestPriceDto";
import { FeatureDto } from "types/api/dto/FeatureDto";
import { getAxios } from "../get";

export async function getAllFeature(): Promise<FeatureDto> {
  const data = await getAxios("feature");
  return data;
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
