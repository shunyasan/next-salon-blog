import { IdAndNameDto } from "types/IdAndNameDto";

export const idAndNameService = () => {
  const serializeIdAndName = (id: string, name: string): IdAndNameDto => {
    const data: IdAndNameDto = { id, name };
    return data;
  };

  return {
    serializeIdAndName,
  };
};
