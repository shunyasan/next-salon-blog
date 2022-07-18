import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { Feature } from "enums/FeatureEnum";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import ClinicListTemplate from "components/templete/pages/clinic/ClinicListTemplate";
import { useRouter } from "next/router";
import { ClinicPageProps } from "types/ClinicPageProps";
import { clinicPagePropsRepository } from "services/repository/clinicPagePropsRepository";
import { relationClinicRepository } from "services/repository/relationClinicRepository";

const numOfTake = 10;
const feature = Feature.anesthesia;

const { getClinicPagesDataForFeature } = clinicPagePropsRepository();
const { checkCountFeatureFunc } = relationClinicRepository();

export const getStaticPaths: GetStaticPaths = async () => {
  const count = await checkCountFeatureFunc(feature);
  const num = Math.ceil(count / numOfTake);
  const paths = [...Array(num)].map((_, i) => `/feature/anesthesia/${i + 1}`);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ClinicPageProps> = async ({
  params,
}) => {
  const num = params ? Number(params.page) : 0;
  const { clinics, page, maxData, twitter, instagram } =
    await getClinicPagesDataForFeature(feature, num);
  return {
    props: {
      clinics,
      page,
      maxData,
      twitter,
      instagram,
    },
  };
};

const AnesthesiaFeature: NextPage<ClinicPageProps> = ({
  clinics,
  page,
  maxData,
  twitter,
  instagram,
}) => {
  const router = useRouter();

  if (!clinics) return <LoadingIcon />;
  return (
    <>
      <Head>
        <title>麻酔が無料のクリニック | 脱毛コンサルタント</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめする麻酔が無料のクリニックです。痛いのが苦手な方で少しでも安いプランをご希望の方にておすすめです。"
        />
      </Head>
      <ClinicListTemplate
        title="麻酔無料のクリニック"
        maxData={maxData}
        area={[]}
        clinics={clinics}
        page={page}
        twitter={twitter}
        instagram={instagram}
        getPage={(page) => router.push(`/feature/anesthesia/${page + 1}`)}
      />
    </>
  );
};
export default AnesthesiaFeature;
