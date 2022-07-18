import { Feature } from "enums/FeatureEnum";
import { prisma } from "services/common/prisma";
import { clinicRepository } from "services/common/repository";
import {
  ClinicNestPriceDto,
  ClinicToClinicNestPriceDto,
} from "types/ClinicNestPriceDto";
import { PagenationParameter } from "types/PagenationParameterDto";
import { RelationClinic } from "types/RelationClinic";
import { priceRepository } from "./priceRepository";
import { relationClinicRepository } from "./relationClinicRepository";

const {
  checkFeatureFunc,
  checkCountFeatureFunc,
  getAllRelationClinicByAreaId,
  getAllRelationClinic,
} = relationClinicRepository();
const { getPlanByClinicId } = priceRepository();

export const clinicNestPriceRepository = () => {
  // constructor(private readonly prisma = prisma.clinicArea) {}

  const getAllClinicByAreaId = async (
    areaId: string,
    pagenation: PagenationParameter
  ): Promise<ClinicNestPriceDto[]> => {
    const clinics = await getAllRelationClinicByAreaId(areaId, pagenation);
    const nestPrice = await Promise.all(
      clinics.map(async (data) => {
        const prices = await getPlanByClinicId(data.id);
        return ClinicToClinicNestPriceDto(data, prices);
      })
    );
    return nestPrice;
  };

  const getAllClinicAndLimit = async (
    pagenation: PagenationParameter
  ): Promise<ClinicNestPriceDto[]> => {
    const clinics = await getAllRelationClinic(pagenation);
    const nestPrice = await Promise.all(
      clinics.map(async (data) => {
        const prices = await getPlanByClinicId(data.id);
        return ClinicToClinicNestPriceDto(data, prices);
      })
    );
    return nestPrice;
  };

  const changeGetClinicsEachAreaId = async (
    num: number,
    areaId?: string
  ): Promise<RelationClinic[]> => {
    const numOfTakeData = 10;
    if (areaId) {
      return getAllRelationClinicByAreaId(areaId, {
        take: numOfTakeData,
        skip: (num - 1) * numOfTakeData,
      });
    } else {
      return getAllRelationClinic({
        take: numOfTakeData,
        skip: (num - 1) * numOfTakeData,
      });
    }
  };

  const getFeature = async (
    feature: string,
    pagenation: PagenationParameter
  ): Promise<ClinicNestPriceDto[]> => {
    const clinics = await checkFeatureFunc(
      feature,
      pagenation.take,
      pagenation.skip
    );
    const nestPrice = await Promise.all(
      clinics.map(async (data) => {
        const prices = await getPlanByClinicId(data.id);
        return ClinicToClinicNestPriceDto(data, prices);
      })
    );
    return nestPrice;
  };

  const getCountFeature = async (feature: string): Promise<number> => {
    const count = await checkCountFeatureFunc(feature);
    return count;
  };

  return {
    getAllClinicAndLimit,
    getAllClinicByAreaId,
    changeGetClinicsEachAreaId,
    getFeature,
    getCountFeature,
  };
};
