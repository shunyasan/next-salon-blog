import { ClinicArea } from "@prisma/client";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { useCallback } from "react";
import { ClinicAreaService } from "services/orm/clinic-areas/get";

export default async function getAllArea(
  req: NextApiRequest,
  res: NextApiResponse<ClinicArea[]>
) {
  const clinicAreaService = new ClinicAreaService();
  const data = await clinicAreaService.getAllClinicArea();

  // const data: ClinicArea[] = await getAxios(`clinic-area`);
  res.json(data);
}
