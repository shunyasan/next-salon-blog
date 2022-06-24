import { Box, Checkbox, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { ClinicArea } from "@prisma/client";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import { PlanCard } from "components/organisms/board/PlanCard";
import { AreaBox } from "components/organisms/box/AreaBox";
import { Pagenation } from "components/templete/pagenation/Pagenation";
import ClinicListTemplate from "components/templete/pages/clinic/ClinicListTemplate";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { ClinicAreaService } from "services/orm/clinic-area-service";
import { ClinicService } from "services/orm/clinic-service";
import fetcher from "services/fetcher";
import { clinicAreaService, clinicService } from "services/service";
import { tweet } from "services/tweet";
import useSWR from "swr";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";

const numOfClinicMax = 71;
const numOfTakeData = 10;
const areaId = "AC000005";

const defaultPagenation = {
  now: 0,
  block: 0,
};

type Props = {
  area: ClinicArea[];
  clinics: ClinicNestPriceDto[];
  // defaultPagenation: { now: number; block: number };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const num = Math.ceil(numOfClinicMax / numOfTakeData);
  const paths = [...Array(num)].map((_, i) => `/clinic/sinjuku/${i + 1}`);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const area: ClinicArea[] = await clinicAreaService.getAllClinicArea();
  const num = params ? Number(params.page) : 0;
  // const area: ClinicArea[] = await fetcher(`${thisURL}api/clinic-areas`);

  const clinics: ClinicNestPriceDto[] =
    await clinicService.getAllClinicByAreaId(areaId, {
      take: numOfTakeData,
      skip: (num - 1) * numOfTakeData,
    });
  // const clinics: ClinicNestPriceDto[] = await fetcher(
  //   `${thisURL}api/clinics/prices?take=${numOfTakeData}&skip=0`
  // );
  return {
    props: {
      area,
      clinics,
      defaultPagenation,
    },
  };
};

const ClinicsSinjuku: NextPage<Props> = ({ area, clinics }) => {
  const router = useRouter();
  // const { getAllClinic, getAllClinicByAreaId } = ClinicApi();
  // const { getAllArea } = ClinicAreaApi();

  // const [clinicData, setClinicData] = useState<ClinicNestPriceDto[]>([]);
  // const [areaData, setAreaData] = useState<ClinicArea[]>([]);

  // const [clinicUrl, setClinicUrl] = useState<string>();

  // const [page, setPage] = useState<number>(0);

  // const { data: areaData, error: err_area } = useSWR<ClinicArea[]>(
  //   `/api/clinic-areas`,
  //   fetcher,
  //   {
  //     fallbackData: area,
  //   }
  // );

  // const { data: clinicData, error: err_cli } = useSWR<ClinicNestPriceDto[]>(
  //   `/api/clinics/area/${areaId}?take=${numOfTakeData}&skip=${
  //     numOfTakeData * page
  //   }`,
  //   fetcher,
  //   {
  //     fallbackData: clinics,
  //   }
  // );

  if (!clinics) return <LoadingIcon />;
  return (
    <>
      <Head>
        <title>新宿区の医療脱毛クリニック一覧 | あなたのための脱毛</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」にあるクリニック一覧です"
        />
      </Head>

      <ClinicListTemplate
        title="新宿区の医療脱毛クリニック一覧"
        areaId={areaId}
        areaMax={numOfClinicMax}
        area={area || []}
        clinics={clinics}
        getPage={(page) => router.push(`/clinic/sinjuku/${page + 1}`)}
      />
    </>
  );
};
export default ClinicsSinjuku;
