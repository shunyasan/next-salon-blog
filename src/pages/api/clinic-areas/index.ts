import { ClinicArea } from "@prisma/client";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { clinicAreaService } from "services/service";

export default async function getAllArea(
  req: NextApiRequest,
  res: NextApiResponse<ClinicArea[]>
) {
  const data = await clinicAreaService.getAllClinicArea();

  // const data: ClinicArea[] = await getAxios(`clinic-area`);
  res.json(data);
}
