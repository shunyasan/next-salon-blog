import { ActionEnum } from "@prisma/client";

export interface ActionParam {
  kind: ActionEnum;
  json: string;
}
