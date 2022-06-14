import { Clinic } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ClinicService } from "services/orm/clinics/get";

export default async function getAllClinics(
  req: NextApiRequest,
  res: NextApiResponse<Clinic[]>

  // clinicId: string
) {
  // const param = `take=${req.query.take}&skip=${req.query.skip}`;
  const clinicService = new ClinicService();
  const data = await clinicService.getAllClinics();

  // const data: Clinic[] = await getAxios("clinic");
  res.json(data);
}
