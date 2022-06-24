import { Clinic } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { clinicService } from "services/service";

export default async function getAllClinics(
  req: NextApiRequest,
  res: NextApiResponse<Clinic[]>

  // clinicId: string
) {
  // const param = `take=${req.query.take}&skip=${req.query.skip}`;
  const data = await clinicService.getAllClinics();

  // const data: Clinic[] = await getAxios("clinic");
  res.json(data);
}
