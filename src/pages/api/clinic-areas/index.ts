import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { useCallback } from "react";
import { ClinicArea } from "types/api/ClinicArea";
import { getAxios } from "../../../services/api/get";

export default async function getAllArea(
  req: NextApiRequest,
  res: NextApiResponse<ClinicArea[]>
): Promise<ClinicArea[]> {
  const data: ClinicArea[] = await getAxios(`clinic-area`);
  res.json(data);
  return data;
}
