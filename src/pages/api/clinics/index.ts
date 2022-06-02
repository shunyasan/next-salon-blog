import { NextApiRequest, NextApiResponse } from "next";
import { Clinic } from "types/api/Clinic";
import { getAxios } from "../../../services/api/get";

export default async function getAllClinics(
  req: NextApiRequest,
  res: NextApiResponse<Clinic[]>

  // clinicId: string
): Promise<Clinic[]> {
  // const param = `take=${req.query.take}&skip=${req.query.skip}`;

  const data: Clinic[] = await getAxios("clinic");
  res.json(data);
  return data;
}
