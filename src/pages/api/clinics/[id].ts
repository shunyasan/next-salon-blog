import { Clinic } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { clinicService } from "services/service";

export default async function getOneClinic(
  req: NextApiRequest,
  res: NextApiResponse<Clinic>

  // clinicId: string
) {
  const clinicId = req.query.id as string;
  const data = await clinicService.getOneClinic(clinicId);

  // const data: Clinic = await getAxios("clinic/" + clinicId);
  res.json(data);
}
