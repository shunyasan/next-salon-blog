import { Clinic } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { clinicRepository } from "services/common/repository";

export default async function getOneClinic(
  req: NextApiRequest,
  res: NextApiResponse<Clinic>

  // clinicId: string
) {
  const clinicId = req.query.id as string;
  const data = await clinicRepository.getOneClinic(clinicId);

  // const data: Clinic = await getAxios("clinic/" + clinicId);
  res.json(data);
}
