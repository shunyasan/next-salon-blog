import { ActionEnum } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ActionRepository } from "services/repository/actionRepository";
import { ActionParam } from "types/ActionParam";

const { createAction } = ActionRepository();

export default async function getBaseParts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: ActionParam = JSON.parse(req.body);
  await createAction(body);

  res.status(201);
}
