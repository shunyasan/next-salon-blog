import { clinicAreaRepository } from "services/common/repository";
import { ClinicPageProps } from "types/ClinicPageProps";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";
import { clinicNestPriceRepository } from "./clinicNestPriceRepository";
import { InstagramRepository } from "./InstagramRepository";
import { twitterRepository } from "./twitterRepository";
import { relationClinicRepository } from "./relationClinicRepository";

const { getTwittersRamdom } = twitterRepository();
const { getInstagramRamdom } = InstagramRepository();
const { changeGetClinicsEachAreaId } = clinicNestPriceRepository();
const {
  checkFeatureFunc,
  checkCountFeatureFunc,
  getAllRelationClinicByAreaId,
  getAllRelationClinic,
} = relationClinicRepository();

const numOfTake = 10;

export const clinicPagePropsRepository = () => {
  const getClinicPagesData = async (
    num: number,
    areaId: string,
    maxData: number
  ): Promise<ClinicPageProps> => {
    const area = await clinicAreaRepository.getAllClinicArea();
    const page = num - 1 >= 0 ? num - 1 : 0;
    const clinics = await changeGetClinicsEachAreaId(num, areaId);
    const twitter = await getTwittersRamdom(3);
    const instagram = await getInstagramRamdom(2);
    return {
      area: { id: areaId, data: area },
      maxData,
      clinics,
      page,
      twitter,
      instagram,
    };
  };

  const getClinicPagesDataForFeature = async (
    feature: string,
    num: number
  ): Promise<ClinicPageProps> => {
    const page = num - 1 >= 0 ? num - 1 : 0;
    const clinics = await checkFeatureFunc(
      feature,
      numOfTake,
      page * numOfTake
    );
    const count = await checkCountFeatureFunc(feature);
    const twitter = await getTwittersRamdom(3);
    const instagram = await getInstagramRamdom(4);

    return {
      maxData: count,
      clinics,
      page,
      twitter,
      instagram,
    };
  };

  return { getClinicPagesData, getClinicPagesDataForFeature };
};
