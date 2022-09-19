import { NextApiRequest, NextApiResponse } from "next";
import { MachineRepository } from "services/repository/machineRepository";
import { IdAndNameDto } from "types/IdAndNameDto";

const { getMachineIdsDisplay } = MachineRepository();

export default async function getMachineIdsApi(
  req: NextApiRequest,
  res: NextApiResponse<IdAndNameDto[]>
) {
  const data = await getMachineIdsDisplay();

  res.json(data);
}
