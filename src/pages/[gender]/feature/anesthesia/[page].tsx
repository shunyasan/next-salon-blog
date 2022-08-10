import { LoadingModalIcon } from "components/atoms/icons/LoadingModalIcon";
import { Feature } from "enums/FeatureEnum";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import ClinicListTemplate from "components/templete/pages/clinic/ClinicListTemplate";
import { useRouter } from "next/router";
import { ClinicPageProps } from "types/ClinicPageProps";
import { clinicPagePropsRepository } from "services/repository/clinicPagePropsRepository";
import { relationClinicRepository } from "services/repository/relationClinicRepository";

type Props = ClinicPageProps & {
  gender: string;
};

const numOfTake = 10;
const feature = Feature.anesthesia;

const { getClinicPagesDataForFeature } = clinicPagePropsRepository();
const { checkCountFeatureFunc } = relationClinicRepository();

export const getStaticPaths: GetStaticPaths = async () => {
  const count = await checkCountFeatureFunc(feature);
  const num = Math.ceil(count / numOfTake);
  const men = [...Array(num)].map((_, i) => `/men/feature/${feature}/${i + 1}`);
  const lady = [...Array(num)].map(
    (_, i) => `/lady/feature/${feature}/${i + 1}`
  );
  const paths = men.concat(lady);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const gender = params ? (params.gender as string) : "lady";
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
      gender,
    },
  };
};

const AnesthesiaFeature: NextPage<Props> = ({
  clinics,
  page,
  maxData,
  twitter,
  instagram,
  gender,
}) => {
  const router = useRouter();

  if (!clinics) return <LoadingModalIcon />;
  return (
    <>
      <Head>
        <title>麻酔が無料のクリニック | 脱毛コンサルタント</title>
        <meta
          name="description"
          content="「渋谷・表参道・原宿」などの首都圏からおすすめする麻酔が無料のクリニックです。痛いのが苦手な方で少しでも安いプランをご希望の方にておすすめです。"
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
        getPage={(page) =>
          router.push(`/${gender}/feature/anesthesia/${page + 1}`)
        }
      />
    </>
  );
};
export default AnesthesiaFeature;
