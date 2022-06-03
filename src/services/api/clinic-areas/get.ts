import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { useCallback } from "react";
import { ClinicArea } from "types/api/ClinicArea";
import { getAxios } from "../get";

export default async function getAllArea(): Promise<ClinicArea[]> {
  const data: ClinicArea[] = await getAxios(`clinic-area`);
  return data;
}
