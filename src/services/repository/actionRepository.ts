import { Action } from "@prisma/client";
import { prisma } from "services/common/prisma";

export const ActionRepository = () => {
  const createAction = async (data: string): Promise<Action> => {
    return await prisma.action.create({
      data: {
        time: new Date(),
        data: data,
      },
    });
    // const a = { id: 1, time: new Date(), data: data };
    // return a;
  };

  return {
    createAction,
  };
};
