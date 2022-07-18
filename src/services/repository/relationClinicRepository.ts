import { Feature } from "enums/FeatureEnum";
import { prisma } from "services/common/prisma";
import { clinicRepository } from "services/common/repository";
import { PagenationParameter } from "types/PagenationParameterDto";
import { RelationClinic } from "types/RelationClinic";

export const relationClinicRepository = () => {
  const checkFeatureFunc = async (
    feature: string,
    take: number,
    skip: number
  ): Promise<RelationClinic[]> => {
    switch (feature) {
      case Feature.anesthesia:
        return clinicRepository.getFreeAnesthesia(take, skip);
      case Feature.installments:
        return clinicRepository.getInstallments(take, skip);
      case Feature.interior:
        return clinicRepository.getInterior(take, skip);
      case Feature.privateRoom:
        return clinicRepository.getPrivateRoom(take, skip);
      case Feature.sutudentDiscount:
        return clinicRepository.getSutudentDiscount(take, skip);
      case Feature.visitFee:
        return clinicRepository.getVisitFee(take, skip);
      default:
        throw new Error();
    }
  };

  const checkCountFeatureFunc = async (feature: string): Promise<number> => {
    switch (feature) {
      case Feature.anesthesia:
        return clinicRepository.getCountFreeAnesthesia();
      case Feature.installments:
        return clinicRepository.getCountInstallments();
      case Feature.interior:
        return clinicRepository.getCountInterior();
      case Feature.privateRoom:
        return clinicRepository.getCountPrivateRoom();
      case Feature.sutudentDiscount:
        return clinicRepository.getCountSutudentDiscount();
      case Feature.visitFee:
        return clinicRepository.getCountVisitFee();
      default:
        throw new Error();
    }
  };

  const getAllRelationClinicByAreaId = (
    areaId: string,
    pagenation: PagenationParameter
  ): Promise<RelationClinic[]> => {
    const query = prisma.clinic.findMany({
      where: {
        areaId: areaId,
      },
      include: {
        picture: {
          orderBy: {
            id: "asc",
          },
        },
        options: {
          distinct: ["kind"],
          orderBy: {
            price: "asc",
          },
        },
        clinicOpeningHours: true,
      },
      take: pagenation.take,
      skip: pagenation.skip,
    });
    return query;
  };

  const getAllRelationClinic = (
    pagenation: PagenationParameter
  ): Promise<RelationClinic[]> => {
    const query = prisma.clinic.findMany({
      include: {
        picture: {
          orderBy: {
            id: "asc",
          },
        },
        options: {
          distinct: ["kind"],
          orderBy: {
            price: "asc",
          },
        },
        clinicOpeningHours: true,
      },
      take: pagenation.take,
      skip: pagenation.skip,
    });
    return query;
  };

  return {
    checkFeatureFunc,
    checkCountFeatureFunc,
    getAllRelationClinicByAreaId,
    getAllRelationClinic,
  };
};
