import { Clinic, Area, Twitter } from "@prisma/client";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import ClinicListTemplate from "components/templete/pages/clinic/ClinicListTemplate";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ClinicPageProps } from "types/ClinicPageProps";
import { clinicPagePropsRepository } from "services/repository/clinicPagePropsRepository";

const numOfClinicMax = 86;
const numOfTakeData = 10;
//渋谷
const areaId = "AC000003";

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
  const { area, maxData, clinics, page, twitter, instagram } =
    await getClinicPagesData(num, areaId, numOfClinicMax);

  return {
    props: {
      area,
      clinics,
      maxData,
      page,
      twitter,
      instagram,
    },
  };
};

const ClinicsShibuya: NextPage<ClinicPageProps> = ({
  area,
  clinics,
  maxData,
  page,
  twitter,
  instagram,
}) => {
  const router = useRouter();

  if (!clinics) return <LoadingIcon />;
  return (
    <>
      <Head>
        <title>渋谷区の医療脱毛クリニック一覧 | 脱毛コンサルタント</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」にあるクリニック一覧です"
        />
      </Head>
      <ClinicListTemplate
        title="渋谷区の医療脱毛クリニック一覧"
        areaId={areaId}
        maxData={numOfClinicMax}
        area={area?.data || []}
        clinics={clinics}
        page={page}
        twitter={twitter}
        instagram={instagram}
        getPage={(page) => router.push(`/clinic/${page + 1}`)}
      />
    </>
  );
};
export default ClinicsShibuya;
