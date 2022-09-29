import { Clinic, Area, Twitter } from "@prisma/client";
import { LoadingModalIcon } from "components/atoms/icons/LoadingModalIcon";
import ClinicListTemplate from "components/templete/pages/clinic/ClinicListTemplate";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ClinicPageProps } from "types/ClinicPageProps";
import { clinicPagePropsRepository } from "services/repository/clinicPagePropsRepository";
import { Gender } from "types/Gender";

type Props = ClinicPageProps & {
  gender: Gender;
};
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
  const men = [...Array(num)].map((_, i) => `/men/clinic/${i + 1}`);
  const lady = [...Array(num)].map((_, i) => `/lady/clinic/${i + 1}`);
  const paths = men.concat(lady);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const num = params ? Number(params.page) : 0;
  const gender = params ? (params.gender as Gender) : "lady";
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
      gender,
    },
  };
};

const ClinicsShibuya: NextPage<Props> = ({
  area,
  clinics,
  maxData,
  page,
  twitter,
  instagram,
  gender,
}) => {
  const router = useRouter();

  if (!clinics) return <LoadingModalIcon />;
  return (
    <>
      <Head>
        <title>渋谷区の一覧 | 脱毛コンサルタント</title>
        <meta
          name="description"
          content="「渋谷・表参道・原宿」などの首都圏にある医療脱毛クリニック一覧です"
        />
      </Head>
      <ClinicListTemplate
        title="渋谷区の一覧"
        areaId={areaId}
        maxData={numOfClinicMax}
        area={area?.data || []}
        clinics={clinics}
        page={page}
        twitter={twitter}
        instagram={instagram}
        getPage={(page) => router.push(`/${gender}/clinic/${page + 1}`)}
      />
    </>
  );
};
export default ClinicsShibuya;
