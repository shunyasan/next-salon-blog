import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { FeatureSearch } from "components/templete/pages/feature/FeatureSearch.tsx";
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
  // const clinics: ClinicNestPriceDto[] = await fetcher(
  //   `${thisURL}api/features/${Feature.anesthesia}?take=${numOfTake}&skip=0`
  // );

  const feature = new FeatureService();
  const clinics = await feature.getFeature(Feature.anesthesia, {
    take: numOfTake,
    skip: 0,
  });
  // const clinics: ClinicNestPriceDto[] = await getFeature(
  //   Feature.anesthesia,
  //   numOfTake,
  //   0
  // );

  // const count: number = await fetcher(
  //   `${thisURL}api/features/count/${Feature.anesthesia}`
  // );
  const count = await feature.getCountFeature(Feature.anesthesia);
  return {
    props: {
      clinics,
      count,
    },
  };
};

const AnesthesiaFeature: NextPage<Props> = ({ clinics, count }) => {
  const [pagenationData, setPagenationData] = useState<{
    now: number;
    block: number;
  }>({
    now: 0,
    block: 0,
  });

  const { data: clinicData, error: err_cli } = useSWR<ClinicNestPriceDto[]>(
    `/api/features/${Feature.anesthesia}?take=${numOfTake}&skip=${
      numOfTake * pagenationData.now
    }`,
    fetcher,
    { fallbackData: clinics }
  );

  const { data: maxData, error: err_max } = useSWR<number>(
    `/api/features/count/${Feature.anesthesia}`,
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
        <title>麻酔が無料のクリニック | あなたのための脱毛</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめする麻酔が無料のクリニックです。痛いのが苦手な方で少しでも安いプランをご希望の方にておすすめです。"
        />
      </Head>
      <FeatureSearch
        title="麻酔無料のクリニック"
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
export default AnesthesiaFeature;
