import { LoadingModalIcon } from "components/atoms/icons/LoadingModalIcon";
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

type Props = ClinicPageProps & {
  gender: string;
};

const numOfTake = 10;
const feature = Feature.sutudentDiscount;
const title = "学生料金（学割）のあるクリニック";

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

const SutudentDiscountFeature: NextPage<Props> = ({
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
        <title>学生料金のあるクリニック | 脱毛コンサルタント</title>
        <meta
          name="description"
          content="「渋谷・表参道・原宿」などの首都圏からおすすめする学生料金のあるクリニックです。学割などをご希望の方にておすすめです。"
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
        getPage={(page) =>
          router.push(`/${gender}/feature/sutudentDiscount/${page + 1}`)
        }
      />
    </>
  );
};
export default SutudentDiscountFeature;
