import { NextApiRequest, NextApiResponse } from "next";
import { Clinic } from "types/api/Clinic";
import { getAxios } from "../../../services/orm/get";

export default async function getOneClinic(
  req: NextApiRequest,
  res: NextApiResponse<Clinic>

  // clinicId: string
): Promise<Clinic> {
  const clinicId = req.query.id;

  const data: Clinic = await getAxios("clinic/" + clinicId);
  res.json(data);
  return data;
}
