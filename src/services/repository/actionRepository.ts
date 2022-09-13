import { Action, ActionEnum } from "@prisma/client";
import { prisma } from "services/common/prisma";
import { ActionParam } from "types/ActionParam";

export const ActionRepository = () => {
  const createAction = async (params: ActionParam): Promise<Action> => {
    return await prisma.action.create({
      data: {
        time: new Date(),
        data: params.json,
        kind: params.kind,
      },
    });
  };

  return {
    createAction,
  };
};
