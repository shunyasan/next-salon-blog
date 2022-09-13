import { ActionEnum } from "@prisma/client";
import { ActionParam } from "types/ActionParam";

export const ActionService = () => {
  const createActionApi = async (kind: ActionEnum, json: string) => {
    const body: ActionParam = { json, kind };
    await fetch("/api/action/create", {
      method: "POST",
      body: JSON.stringify(body),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });

    return;
  };

  return {
    createActionApi,
  };
};
