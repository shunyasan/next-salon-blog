import { Clinic, ClinicArea, Twitter } from "@prisma/client";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import ClinicListTemplate from "components/templete/pages/clinic/ClinicListTemplate";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ClinicServiceFunc } from "services/orm/ClinicServiceFunc";
import { twitterService } from "services/orm/twitterService";
import { clinicAreaService, clinicService } from "services/service";
import { ClinicPageProps } from "types/app/ClinicPageProps";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";

const numOfClinicMax = 53;
const numOfTakeData = 10;
const areaId = "AC000004";

const defaultPagenation = {
  now: 0,
  block: 0,
};

const { getClinicPagesData } = ClinicServiceFunc();

export const getStaticPaths: GetStaticPaths = async () => {
  const num = Math.ceil(numOfClinicMax / numOfTakeData);
  const paths = [...Array(num)].map((_, i) => `/clinic/toshima/${i + 1}`);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ClinicPageProps> = async ({
  params,
}) => {
  const num = params ? Number(params.page) : 0;
  const { area, clinics, page, twitter, instagram } = await getClinicPagesData(
    num,
    areaId
  );
  // const clinics: ClinicNestPriceDto[] = await fetcher(
  //   `${thisURL}api/clinics/prices?take=${numOfTakeData}&skip=0`
  // );
  return {
    props: {
      area,
      clinics,
      page,
      twitter,
      instagram,
    },
  };
};

const ClinicsToshima: NextPage<ClinicPageProps> = ({
  area,
  clinics,
  page,
  twitter,
  instagram,
}) => {
  const router = useRouter();
  // const { getAllClinic, getAllClinicByAreaId } = ClinicApi();
  // const { getAllArea } = ClinicAreaApi();

  // const [clinicData, setClinicData] = useState<ClinicNestPriceDto[]>([]);
  // const [areaData, setAreaData] = useState<ClinicArea[]>([]);

  // const [clinicUrl, setClinicUrl] = useState<string>();

  // const [page, setPage] = useState<number>(0);

  // const { data: areaData, error: err_area } = useSWR<ClinicArea[]>(
  //   `/api/clinic-areas`,
  //   fetcher,
  //   {
  //     fallbackData: area,
  //   }
  // );

  // const { data: clinicData, error: err_cli } = useSWR<ClinicNestPriceDto[]>(
  //   `/api/clinics/area/${areaId}?take=${numOfTakeData}&skip=${
  //     numOfTakeData * page
  //   }`,
  //   fetcher,
  //   {
  //     fallbackData: clinics,
  //   }
  // );

  if (!clinics) return <LoadingIcon />;
  return (
    <>
      <Head>
        <title>豊島区の医療脱毛クリニック一覧 | 脱毛コンサルタント</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」にあるクリニック一覧です"
        />
      </Head>
      <ClinicListTemplate
        title="豊島区の医療脱毛クリニック一覧"
        areaId={areaId}
        areaMax={numOfClinicMax}
        area={area || []}
        clinics={clinics}
        page={page}
        twitter={twitter}
        instagram={instagram}
        getPage={(page) => router.push(`/clinic/toshima/${page + 1}`)}
      />
    </>
  );
};
export default ClinicsToshima;
