import { Machine } from "@prisma/client";
import { prisma } from "services/common/prisma";
import { idAndNameService } from "services/idAndNameService";
import { IdAndNameDto } from "types/IdAndNameDto";

const { serializeIdAndName } = idAndNameService();

export const MachineRepository = () => {
  // constructor(private readonly prisma = prisma.machine) {}

  const getAllBySkinColor = async (
    skinColor: number
  ): Promise<IdAndNameDto[]> => {
    const data = await prisma.irradiation.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        skinColor: skinColor,
      },
      orderBy: {
        name: "desc",
      },
    });
    return data;
  };

  const getAllByHairType = async (hair: string): Promise<IdAndNameDto[]> => {
    const hairs = await prisma.hair.findMany({
      select: {
        id: true,
        kind: true,
      },
      where: {
        kind: hair,
      },
    });

    const ans = hairs.map((data) => {
      const idName: IdAndNameDto = {
        id: data.id,
        name: data.kind,
      };
      return idName;
    });
    return ans;
  };

  const getMachineIdBySkinAndHair = async (
    skinColor?: number,
    hair?: string
  ): Promise<IdAndNameDto[]> => {
    const getSkinColor = skinColor ? await getAllBySkinColor(skinColor) : [];
    const getHair = hair ? await getAllByHairType(hair) : [];
    const allData = getSkinColor.concat(getHair);
    return allData;
  };

  const getMachineIdsDisplay = async (): Promise<Machine[]> => {
    const machines = await prisma.machine.findMany({
      where: {
        display: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return machines;
  };

  const getMachineIdsOwnType = async (
    skin: number,
    hair: string
  ): Promise<Machine[]> => {
    return prisma.machine.findMany({
      where: {
        display: true,
        irradiations: {
          some: {
            irradiation: {
              skinColor: {
                gte: skin,
              },
              hairs: {
                some: {
                  hair: {
                    kind: hair,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
  };

  const getMachineInIds = async (ids: string[]) => {
    const machines = await prisma.machine.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        display: true,
        id: {
          in: ids,
        },
      },
    });

    const res = machines.map((machine) => {
      return serializeIdAndName(machine.id, machine.name);
    });

    return res;
  };

  return {
    getMachineIdBySkinAndHair,
    getMachineIdsDisplay,
    getMachineIdsOwnType,
    getMachineInIds,
  };
};
