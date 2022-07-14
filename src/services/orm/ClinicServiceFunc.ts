import { Clinic } from "@prisma/client";
import { clinicAreaService, clinicService } from "services/service";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";
import { PagenationParameter } from "types/PagenationParameterDto";
import { instagramService } from "./instagramService";
import { PriceService } from "./price-service";
import { ClinicRepository } from "./repository/clinicRepository";
import { twitterService } from "./twitterService";

const { getTwittersRamdom } = twitterService();
const { getInstagramRamdom } = instagramService();

export const ClinicServiceFunc = () => {
  const changeGetClinicsEachAreaId = async (
    num: number,
    areaId?: string
  ): Promise<ClinicNestPriceDto[]> => {
    const numOfTakeData = 10;
    if (areaId) {
      return clinicService.getAllClinicByAreaId(areaId, {
        take: numOfTakeData,
        skip: (num - 1) * numOfTakeData,
      });
    } else {
      return clinicService.getAllClinicAndLimit({
        take: numOfTakeData,
        skip: (num - 1) * numOfTakeData,
      });
    }
  };

  const getClinicPagesData = async (num: number, areaId?: string) => {
    const area = await clinicAreaService.getAllClinicArea();
    // const num = params ? Number(params.page) : 0;
    const page = num - 1 >= 0 ? num - 1 : 0;
    // const area: ClinicArea[] = await fetcher(`${thisURL}api/clinic-areas`);

    // const clinics: ClinicNestPriceDto[] = await fetcher(
    //   `${thisURL}api/clinics/prices?take=${numOfTakeData}&skip=0`
    // );
    const clinics = await changeGetClinicsEachAreaId(num, areaId);
    const twitter = await getTwittersRamdom(3);
    const instagram = await getInstagramRamdom(2);
    return {
      area,
      clinics,
      page,
      twitter,
      instagram,
    };
  };

  return { getClinicPagesData };
};
