import { prisma } from "services/common/prisma";
import { clinicRepository } from "services/common/repository";
import { FeatureDto } from "types/FeatureDto";
import { RelationClinic } from "types/RelationClinic";

export const featureDtoRepository = () => {
  // constructor(private readonly prisma = prisma.clinicArea) {}

  const getAllFeature = async () => {
    const anesthesia: RelationClinic[] =
      await clinicRepository.getFreeAnesthesia(10, 0, true);
    const installments: RelationClinic[] =
      await clinicRepository.getInstallments(10, 0, true);
    const interior: RelationClinic[] = await clinicRepository.getInterior(
      10,
      0,
      true
    );
    const privateRoom: RelationClinic[] = await clinicRepository.getPrivateRoom(
      10,
      0,
      true
    );
    const sutudentDiscount: RelationClinic[] =
      await clinicRepository.getSutudentDiscount(10, 0, true);
    const visitFee: RelationClinic[] = await clinicRepository.getVisitFee(
      10,
      0,
      true
    );
    const feature: FeatureDto = {
      anesthesia,
      installments,
      interior,
      privateRoom,
      sutudentDiscount,
      visitFee,
    };
    return feature;
  };
  return { getAllFeature };
};
