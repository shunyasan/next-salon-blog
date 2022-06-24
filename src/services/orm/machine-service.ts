import { IdAndNameDto } from "types/IdAndNameDto";
import { MachineRepository } from "./repository/machineRepository";

export class MachineService {
  constructor(private readonly machineRepository: MachineRepository) {}

  async getIdfindBySkinColorAndHairType(
    skinColor?: string,
    hair?: string
  ): Promise<IdAndNameDto[]> {
    const skin = skinColor ? this.selectSkinColor(skinColor) : 0;
    const hairType = hair && this.selectHairType(hair);
    const machines =
      await this.machineRepository.getIdfindBySkinColorAndHairType(
        skin,
        hairType
      );
    return machines;
  }

  selectSkinColor(skiColor: string) {
    const func: any = {};
    func["白色"] = 1;
    func["薄茶色"] = 2;
    func["色黒"] = 3;
    const skinNumber = func[skiColor];
    if (!skinNumber) {
      throw new Error("対応不可の肌色です");
    }
    return skinNumber as number;
  }

  selectHairType(hair: string) {
    const func: any = {};
    func["産毛"] = "soft";
    func["標準"] = "standard";
    func["太い"] = "hard";
    const changedHair = func[hair];
    if (!changedHair) {
      throw new Error("対応不可の毛の状態です");
    }
    return changedHair as string;
  }
}
