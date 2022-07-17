import { clinicAreaRepository } from "services/common/repository";
import { ClinicPageProps } from "types/ClinicPageProps";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";
import { clinicNestPriceRepository } from "./clinicNestPriceRepository";
import { InstagramRepository } from "./InstagramRepository";
import { twitterRepository } from "./twitterRepository";

const { getTwittersRamdom } = twitterRepository();
const { getInstagramRamdom } = InstagramRepository();
const { changeGetClinicsEachAreaId } = clinicNestPriceRepository();

export const clinicPagePropsRepository = () => {
  const getClinicPagesData = async (
    num: number,
    areaId?: string
  ): Promise<ClinicPageProps> => {
    const area = await clinicAreaRepository.getAllClinicArea();
    // const num = params ? Number(params.page) : 0;
    const page = num - 1 >= 0 ? num - 1 : 0;
    // const area: Area[] = await fetcher(`${thisURL}api/clinic-areas`);

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
