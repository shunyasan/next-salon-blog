import { prisma } from "services/prisma";
import { IdAndNameDto } from "types/IdAndNameDto";

export class MachineRepository {
  // constructor(private readonly prisma = prisma.machine) {}

  async getAllBySkinColor(skinColor: number): Promise<IdAndNameDto[]> {
    return prisma.machine.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        OR: [
          {
            machineHr: {
              skinColor: skinColor,
            },
            machineShr: {
              skinColor: skinColor,
            },
          },
        ],
      },
    });
  }

  async getAllByHairType(hair: string): Promise<IdAndNameDto[]> {
    return prisma.machine.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        OR: [
          {
            machineHr: {
              hairType: hair,
            },
            machineShr: {
              hairType: hair,
            },
          },
        ],
      },
    });
  }
  async getIdfindBySkinColorAndHairType(
    skinColor?: number,
    hair?: string
  ): Promise<IdAndNameDto[]> {
    const getSkinColor = skinColor
      ? await this.getAllBySkinColor(skinColor)
      : [];
    const getHair = hair ? await this.getAllByHairType(hair) : [];
    const allData = getSkinColor.concat(getHair);
    return allData;
  }
}
