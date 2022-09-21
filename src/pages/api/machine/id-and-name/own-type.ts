import { Machine } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { MachineRepository } from "services/repository/machineRepository";
import { IdAndNameDto } from "types/IdAndNameDto";

const { getMachineIdsOwnType } = MachineRepository();

export default async function getMachineIdsApi(
  req: NextApiRequest,
  res: NextApiResponse<Machine[]>
) {
  const skinParam = Number(req.query.skinId);
  const skin = isNaN(skinParam) ? 2 : skinParam;
  const hair = req.query.hairId as string;

  const data = await getMachineIdsOwnType(skin, hair);

  res.json(data);
}
