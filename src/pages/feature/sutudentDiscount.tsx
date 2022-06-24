import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { FeatureSearch } from "components/templete/pages/feature/FeatureSearch.tsx";
import { Feature } from "enums/FeatureEnum";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { FeatureService } from "services/orm/feature-service";
import fetcher from "services/fetcher";
import { featureService } from "services/service";
import useSWR from "swr";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";

const numOfTake = 10;

type Props = {
  clinics: ClinicNestPriceDto[];
  count: number;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const clinics = await featureService.getFeature(Feature.sutudentDiscount, {
    take: numOfTake,
    skip: 0,
  });
  const count = await featureService.getCountFeature(Feature.sutudentDiscount);

  // const clinics: ClinicNestPriceDto[] = await getFeature(
  //   Feature.sutudentDiscount,
  //   numOfTake,
  //   0
  // );
  // const count: number = await getCountFeature(Feature.sutudentDiscount);
  return {
    props: {
      clinics,
      count,
    },
  };
};

const SutudentDiscountFeature: NextPage<Props> = ({ clinics, count }) => {
  const [pagenationData, setPagenationData] = useState<{
    now: number;
    block: number;
  }>({
    now: 0,
    block: 0,
  });

  const { data: clinicData, error: err_cli } = useSWR<ClinicNestPriceDto[]>(
    `/api/features/${Feature.sutudentDiscount}?take=${numOfTake}&skip=${
      numOfTake * pagenationData.now
    }`,
    fetcher,
    { fallbackData: clinics }
  );

  const { data: maxData, error: err_max } = useSWR<number>(
    `/api/features/count/${Feature.sutudentDiscount}`,
    fetcher,
    { fallbackData: count }
  );

  const getPageNumber = useCallback(
    async (page: number, block?: number) => {
      // getFeatureFunc(page);
      if (block || block === 0) {
        setPagenationData({ now: page, block: block });
      } else {
        setPagenationData({ ...pagenationData, now: page });
      }
    },
    [pagenationData]
  );

  if (!clinicData || !maxData) return <LoadingIcon />;
  return (
    <>
      <Head>
        <title>学生料金のあるクリニック | あなたのための脱毛</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめする学生料金のあるクリニックです。学割などをご希望の方にておすすめです。"
        />
      </Head>
      <FeatureSearch
        title="学生料金（学割）のあるクリニック"
        take={numOfTake}
        clinicData={clinicData}
        maxData={maxData}
        pagenationData={pagenationData}
        getPageNumber={(page: number, block?: number) =>
          getPageNumber(page, block)
        }
      />
    </>
  );
};
export default SutudentDiscountFeature;
