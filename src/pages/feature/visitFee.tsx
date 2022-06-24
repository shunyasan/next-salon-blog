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
  const clinics = await featureService.getFeature(Feature.visitFee, {
    take: numOfTake,
    skip: 0,
  });
  const count = await featureService.getCountFeature(Feature.visitFee);

  // const clinics: ClinicNestPriceDto[] = await getFeature(
  //   Feature.visitFee,
  //   numOfTake,
  //   0
  // );
  // const count: number = await getCountFeature(Feature.visitFee);
  return {
    props: {
      clinics,
      count,
    },
  };
};

const VisitFeeFeature: NextPage<Props> = ({ clinics, count }) => {
  const [pagenationData, setPagenationData] = useState<{
    now: number;
    block: number;
  }>({
    now: 0,
    block: 0,
  });

  const { data: clinicData = [], error: err_cli } = useSWR<
    ClinicNestPriceDto[]
  >(
    `/api/features/${Feature.visitFee}?take=${numOfTake}&skip=${
      numOfTake * pagenationData.now
    }`,
    fetcher,
    { fallbackData: clinics }
  );

  const { data: maxData = 0, error: err_max } = useSWR<number>(
    `/api/features/count/${Feature.visitFee}`,
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
        <title>初診料が無料のクリニック | あなたのための脱毛</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめする初診料が無料のクリニックです。少しでも安いプランをご希望の方にておすすめです。"
        />
      </Head>
      <FeatureSearch
        title="初診・再診料無料のクリニック"
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
export default VisitFeeFeature;
