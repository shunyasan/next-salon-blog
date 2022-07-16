import { prisma } from "services/prisma";
import { IdAndNameDto } from "types/IdAndNameDto";

export class MachineRepository {
  // constructor(private readonly prisma = prisma.machine) {}

  async getAllBySkinColor(skinColor: number): Promise<IdAndNameDto[]> {
    const data = await prisma.irradiation.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        skinColor: skinColor,
      },
    });
    return data;
  }

  async getAllByHairType(hair: string): Promise<IdAndNameDto[]> {
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
