import { FeatureSearch } from "components/templete/feature/FeatureSearch.tsx";
import { Feature } from "enums/FeatureEnum";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { FeatureService } from "services/orm/features/get";
import fetcher from "services/orm/fetcher";
import useSWR from "swr";
import { ClinicNestPriceDto } from "types/api/dto/ClinicNestPriceDto";

const numOfTake = 10;

type Props = {
  clinics: ClinicNestPriceDto[];
  count: number;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const feature = new FeatureService();
  const clinics = await feature.getFeature(Feature.interior, {
    take: numOfTake,
    skip: 0,
  });
  const count = await feature.getCountFeature(Feature.interior);

  // const clinics: ClinicNestPriceDto[] = await getFeature(
  //   Feature.interior,
  //   numOfTake,
  //   0
  // );
  // const count: number = await getCountFeature(Feature.interior);
  return {
    props: {
      clinics,
      count,
    },
  };
};

const InteriorFeature: NextPage = () => {
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
    `/api/features/${Feature.interior}?take=${numOfTake}&skip=${
      numOfTake * pagenationData.now
    }`,
    fetcher
  );

  const { data: maxData = 0, error: err_max } = useSWR<number>(
    `/api/features/count/${Feature.interior}`,
    fetcher
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

  return (
    <>
      <Head>
        <title>内装の豪華なクリニック | あなたのための脱毛</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめする内装が豪華なクリニックです"
        />
      </Head>
      <FeatureSearch
        title="内装が豪華なクリニック"
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
export default InteriorFeature;
