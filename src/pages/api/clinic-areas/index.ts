import { Area } from "@prisma/client";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { clinicAreaRepository } from "services/common/repository";

export default async function getAllArea(
  req: NextApiRequest,
  res: NextApiResponse<Area[]>
) {
  const data = await clinicAreaRepository.getAllClinicArea();

  // const data: Area[] = await getAxios(`clinic-area`);
  res.json(data);
}
