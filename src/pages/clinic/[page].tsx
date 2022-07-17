import { Clinic, Area, Twitter } from "@prisma/client";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import ClinicListTemplate from "components/templete/pages/clinic/ClinicListTemplate";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { clinicPagePropsRepository } from "services/repository/clinicPagePropsRepository";
import { ClinicPageProps } from "types/ClinicPageProps";

const numOfClinicMax = 349;
const numOfTakeData = 10;

const defaultPagenation = {
  now: 0,
  block: 0,
};

const { getClinicPagesData } = clinicPagePropsRepository();

export const getStaticPaths: GetStaticPaths = async () => {
  const num = Math.ceil(numOfClinicMax / numOfTakeData);
  const paths = [...Array(num)].map((_, i) => `/clinic/${i + 1}`);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ClinicPageProps> = async ({
  params,
}) => {
  const num = params ? Number(params.page) : 0;
  const { area, clinics, page, twitter, instagram } = await getClinicPagesData(
    num
  );
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

const ClinicsAll: NextPage<ClinicPageProps> = ({
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
  // const [areaData, setAreaData] = useState<Area[]>([]);

  // const [clinicUrl, setClinicUrl] = useState<string>();

  // const [page, setPage] = useState<number>(0);

  // const { data: areaData, error: err_area } = useSWR<Area[]>(
  //   `/api/clinic-areas`,
  //   fetcher,
  //   {
  //     fallbackData: area,
  //   }
  // );

  // const { data: clinicData, error: err_cli } = useSWR<ClinicNestPriceDto[]>(
  //   `clinics/prices?take=${numOfTakeData}&skip=${numOfTakeData * page}`,
  //   fetcher,
  //   {
  //     fallbackData: clinics,
  //   }
  // );

  if (!clinics) return <LoadingIcon />;
  return (
    <>
      <Head>
        <title>医療脱毛クリニック一覧 | 脱毛コンサルタント</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」にあるクリニック一覧です"
        />
      </Head>
      <ClinicListTemplate
        title="医療脱毛クリニック一覧"
        areaMax={numOfClinicMax}
        area={area || []}
        clinics={clinics}
        page={page}
        twitter={twitter}
        instagram={instagram}
        getPage={(page) => router.push(`/clinic/${page + 1}`)}
      />
    </>
  );
};
export default ClinicsAll;
