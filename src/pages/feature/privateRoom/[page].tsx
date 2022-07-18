import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { Feature } from "enums/FeatureEnum";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import fetcher from "services/common/fetcher";
import useSWR from "swr";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";
import { clinicNestPriceRepository } from "services/repository/clinicNestPriceRepository";
import { clinicPagePropsRepository } from "services/repository/clinicPagePropsRepository";
import { relationClinicRepository } from "services/repository/relationClinicRepository";
import { ClinicPageProps } from "types/ClinicPageProps";
import { useRouter } from "next/router";
import ClinicListTemplate from "components/templete/pages/clinic/ClinicListTemplate";

const numOfTake = 10;
const feature = Feature.privateRoom;
const title = "完全個室のクリニック";

const { getClinicPagesDataForFeature } = clinicPagePropsRepository();
const { checkCountFeatureFunc } = relationClinicRepository();

export const getStaticPaths: GetStaticPaths = async () => {
  const count = await checkCountFeatureFunc(feature);
  const num = Math.ceil(count / numOfTake);
  const paths = [...Array(num)].map((_, i) => `/feature/privateRoom/${i + 1}`);
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

const PrivateRoomFeature: NextPage<ClinicPageProps> = ({
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
        <title>完全個室のあるクリニック | 脱毛コンサルタント</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめする完全個室のあるクリニックです。VIOなどで気にされる方におすすめです。"
        />
      </Head>
      <ClinicListTemplate
        title={title}
        maxData={maxData}
        area={[]}
        clinics={clinics}
        page={page}
        twitter={twitter}
        instagram={instagram}
        getPage={(page) => router.push(`/feature/privateRoom/${page + 1}`)}
      />
    </>
  );
};
export default PrivateRoomFeature;
