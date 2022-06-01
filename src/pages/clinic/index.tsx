import { Box, Checkbox, Flex, HStack, Text } from "@chakra-ui/react";
import { ClinicCard } from "components/organisms/board/ClinicCard";
import { AreaBox } from "components/organisms/box/AreaBox";
import { Pagenation } from "components/templete/pagenation/Pagenation";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import getAllClinic from "pages/api/clinics";
import getAllClinicByAreaId from "pages/api/clinics/area/[id]";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { thisURL } from "services/api/config";
import fetcher from "services/api/fetcher";
import useSWR from "swr";
import { ClinicArea } from "types/api/ClinicArea";
import { ClinicNestPriceDto } from "types/api/dto/ClinicNestPriceDto";

const numOfTakeData = 10;
const defaultMax = 349;

type Props = {
  area: ClinicArea[];
  clinics: ClinicNestPriceDto[];
  defaultPagenation: { now: number; block: number };
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const area: ClinicArea[] = await fetcher(`${thisURL}api/clinic-areas`);
  const clinics: ClinicNestPriceDto[] = await fetcher(
    `${thisURL}api/clinics?take=${numOfTakeData}&skip=0`
  );
  const defaultPagenation = {
    now: 0,
    block: 0,
  };
  return {
    props: {
      area,
      clinics,
      defaultPagenation,
    },
  };
};

const Clinics: NextPage<Props> = ({ area, clinics, defaultPagenation }) => {
  // const { getAllClinic, getAllClinicByAreaId } = ClinicApi();
  // const { getAllArea } = ClinicAreaApi();

  // const [clinicData, setClinicData] = useState<ClinicNestPriceDto[]>([]);
  // const [areaData, setAreaData] = useState<ClinicArea[]>([]);

  const [clinicUrl, setClinicUrl] = useState<string>(
    `clinics?take=${numOfTakeData}&skip=0`
  );

  const [areaIdState, setAreaIdState] = useState<{
    id: string | undefined;
    max: number;
  }>({ id: undefined, max: defaultMax });

  const [pagenationData, setPagenationData] = useState<{
    now: number;
    block: number;
  }>(defaultPagenation);

  const { data: areaData = area, error: err_area } = useSWR<ClinicArea[]>(
    `/api/clinic-areas`,
    fetcher
  );

  const { data: clinicData = clinics, error: err_cli } = useSWR<
    ClinicNestPriceDto[]
  >(`/api/${clinicUrl}`, fetcher);

  // const { data: areaData = [], error: err_ori } = useSWR<ClinicArea[]>(
  //   `/api/clinics?take=${numOfTakeData}&skip=${numOfTakeData * pagenationData.now}`,
  //   fetcher
  // );

  // const getArea = useCallback(async () => {
  // const areas = await getAllArea();
  //   setAreaData(areas);
  // }, [getAllArea]);

  const getClinics = useCallback((page: number, areaId?: string) => {
    if (areaId) {
      setClinicUrl(
        `clinics/area/${areaId}?take=${numOfTakeData}&skip=${
          numOfTakeData * numOfTakeData * page
        }`
      );
    } else {
      setClinicUrl(
        `clinics?take=${numOfTakeData}&skip=${numOfTakeData * page}`
      );
    }
  }, []);

  const getClinicDataAndAreaId = useCallback(
    (page: number, areaId?: string, max?: number) => {
      getClinics(page, areaId);
      setPagenationData({ now: 0, block: 0 });
      if (max) {
        setAreaIdState({ id: areaId, max: max });
      }
    },
    [getClinics]
  );

  const getPageNumber = useCallback(
    (page: number, block?: number) => {
      getClinics(page, areaIdState.id);
      if (block || block === 0) {
        setPagenationData({ now: page, block: block });
      } else {
        setPagenationData({ ...pagenationData, now: page });
      }
    },
    [getClinics, areaIdState, pagenationData]
  );

  // useEffect(() => {
  //   setPagenationData({ now: 0, block: 0 });
  // }, [areaIdState]);

  return (
    <Box my={"3rem"} mx={{ md: "3rem", sm: "1rem" }} textAlign={"center"}>
      <Head>
        <title>クリニック一覧 | あなたのための脱毛</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」にあるクリニック一覧です"
        />
      </Head>
      <Text fontSize={"1.5rem"}>クリニック一覧</Text>
      <HStack
        justifyContent={"space-evenly"}
        wrap={"wrap"}
        spacing={"0"}
        my="2rem"
      >
        <Box>
          <Flex
            cursor={"pointer"}
            border={!areaIdState.id ? "4px" : "1px"}
            w={"8rem"}
            h={"8rem"}
            m={"1rem"}
            alignItems={"center"}
            justifyContent={"center"}
            fontSize={"1.2rem"}
            onClick={() => getClinicDataAndAreaId(0, undefined, defaultMax)}
          >
            <Text>全ての区域</Text>
          </Flex>
          {/* {!areaIdState.id ? <Box fontSize={"1.3rem"}>▼</Box> : ""} */}
        </Box>
        {areaData.map((data, int) => (
          <AreaBox
            key={int}
            area={data.area}
            description={data.description}
            arrow={areaIdState?.id === data.id ? true : false}
            onClick={() =>
              getClinicDataAndAreaId(0, data.id, data.registrationNumber)
            }
            fontSize={"1.2rem"}
          />
        ))}
      </HStack>
      {/* <Adsense /> */}
      <Pagenation
        max={areaIdState.max}
        take={numOfTakeData}
        nowPage={pagenationData.now}
        pageBlock={pagenationData.block}
        onClickNumber={(page: number, block?: number) =>
          getPageNumber(page, block)
        }
      >
        {/* <Box mt={"2rem"}>
          <Checkbox colorScheme="yellow" value={}>系列クリニックをまとめる</Checkbox>
        </Box> */}
        <Box maxW={{ md: "55rem", sm: "100%" }} m="auto">
          {clinicData.map((data, int) => (
            <ClinicCard clinic={data} key={int} />
          ))}
        </Box>
      </Pagenation>
      {/* <Adsense /> */}
    </Box>
  );
};
export default Clinics;
