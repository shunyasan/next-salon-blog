import { NextApiRequest, NextApiResponse } from "next";
import { Clinic } from "types/api/Clinic";
import { ClinicNestPriceDto } from "types/api/dto/ClinicNestPriceDto";
import { getAxios } from "../get";

export async function getAllClinics(): Promise<Clinic[]> {
  // clinicId: string
  // const param = `take=${req.query.take}&skip=${req.query.skip}`;

  const data: Clinic[] = await getAxios("clinic");
  return data;
}

export async function getOneClinic(clinicId: string): Promise<Clinic> {
  const data: Clinic = await getAxios("clinic/" + clinicId);
  return data;
}

export async function getAllClinicNestPrice(
  take: number,
  skip: number
): Promise<ClinicNestPriceDto[]> {
  const query = `take=${take}&skip=${skip}`;
  const data: ClinicNestPriceDto[] = await getAxios(
    "clinic/clinic-nest-price/pagenation?" + query
  );
  return data;
}

export async function getAllClinicNestPriceByAreaId(
  areaId: string,
  take: number,
  skip: number
): Promise<ClinicNestPriceDto[]> {
  const query = `take=${take}&skip=${skip}`;
  const data: ClinicNestPriceDto[] = await getAxios(
    "clinic/clinic-nest-price/area/" + areaId + "/pagenation?" + query
  );
  return data;
}
