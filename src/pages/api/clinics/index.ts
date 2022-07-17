import { Clinic } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { clinicRepository } from "services/common/repository";

export default async function getAllClinics(
  req: NextApiRequest,
  res: NextApiResponse<Clinic[]>

  // clinicId: string
) {
  // const param = `take=${req.query.take}&skip=${req.query.skip}`;
  const data = await clinicRepository.getAll();

  // const data: Clinic[] = await getAxios("clinic");
  res.json(data);
}
