import { NextApiRequest, NextApiResponse } from "next";
import { ActionRepository } from "services/repository/actionRepository";

const { createAction } = ActionRepository();

export default async function getBaseParts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const actionData = req.body;
  await createAction(actionData);

  res.status(201);
}
