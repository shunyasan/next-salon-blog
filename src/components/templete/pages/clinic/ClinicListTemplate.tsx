import { Box, Checkbox, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Clinic, Area, Instagram, Twitter } from "@prisma/client";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import { PlanCard } from "components/organisms/board/PlanCard";
import { AreaBox } from "components/organisms/box/AreaBox";
import { Pagenation } from "components/templete/pagenation/Pagenation";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { FC } from "react";
import fetcher from "services/common/fetcher";
// import { tweet } from "services/tweet";
import useSWR from "swr";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";
import InstagramBox from "components/InstagramBox";
import { UnderLineItemBox } from "components/molecules/box/UnderLineItemBox";
import TwitterBox from "components/TwitterBox";

const numOfTakeData = 10;
const defaultMax = 349;

const defaultPagenation = {
  now: 0,
  block: 0,
};

type Props = {
  areaId?: string;
  title: string;
  areaMax: number;
  area: Area[];
  clinics: ClinicNestPriceDto[];
  page: number;
  twitter: (Twitter & {
    clinic: Clinic;
  })[];
  instagram: (Instagram & {
    clinic: Clinic;
  })[];
  getPage: (page: number) => void;
  // defaultPagenation: { now: number; block: number };
};

// export const getStaticProps: GetStaticProps<Props> = async () => {
//   // const area: Area[] = await fetcher(`${thisURL}api/clinic-areas`);

//   const clinics: ClinicNestPriceDto[] =
//   // const clinics: ClinicNestPriceDto[] = await fetcher(
//   //   `${thisURL}api/clinics/prices?take=${numOfTakeData}&skip=0`
//   // );
//   return {
//     props: {
//       area,
//       clinics,
//       defaultPagenation,
//     },
//   };
// };

const ClinicListTemplate: FC<Props> = ({
  title,
  area,
  clinics,
  areaId,
  areaMax,
  page,
  twitter,
  instagram,
  getPage,
}) => {
  const router = useRouter();
  // const { getAllClinic, getAllClinicByAreaId } = ClinicApi();
  // const { getAllArea } = ClinicAreaApi();

  // const [clinicData, setClinicData] = useState<ClinicNestPriceDto[]>([]);
  // const [areaData, setAreaData] = useState<Area[]>([]);

  // const [clinicUrl, setClinicUrl] = useState<string>(
  //   `clinics/prices?take=${numOfTakeData}&skip=0`
  // );

  // const [areaIdState, setAreaIdState] = useState<{
  //   id: string | undefined;
  //   max: number;
  // }>({ id: undefined, max: defaultMax });

  // const [pagenationData, setPagenationData] = useState<{
  //   now: number;
  //   block: number;
  // }>(defaultPagenation);

  // const { data: areaData, error: err_area } = useSWR<Area[]>(
  //   `/api/clinic-areas`,
  //   fetcher,
  //   {
  //     fallbackData: area,
  //   }
  //
  // );

  // const { data: clinicData, error: err_cli } = useSWR<ClinicNestPriceDto[]>(
  //   `/api/${clinicUrl}`,
  //   fetcher,
  //   {
  //     fallbackData: clinics,
  //   }
  // );
  // const { data: areaData = [], error: err_ori } = useSWR<Area[]>(
  //   `/api/clinics?take=${numOfTakeData}&skip=${numOfTakeData * pagenationData.now}`,
  //   fetcher
  // );

  // const getArea = useCallback(async () => {
  // const areas = await getAllArea();
  //   setAreaData(areas);
  // }, [getAllArea]);

  // const getClinics = useCallback(
  //   (page: number, areaId?: string) => {
  //     let url: string;
  //     if (areaId) {
  //       url = `clinics/area/${areaId}?take=${numOfTakeData}&skip=${
  //         numOfTakeData * page
  //       }`;
  //       // setClinicUrl(url);
  //     } else {
  //       url = `clinics/prices?take=${numOfTakeData}&skip=${
  //         numOfTakeData * page
  //       }`;
  //       // setClinicUrl(url);
  //     }
  //     getClinicUrl(url);
  //   },
  //   [getClinicUrl]
  // );

  // const getPageNumber = useCallback(
  //   (page: number, block?: number) => {
  //     // getClinics(page, areaId);
  //     let pagenation: {
  //       now: number;
  //       block: number;
  //     };
  //     if (block || block === 0) {
  //       pagenation = { now: page, block: block };
  //       setPagenationData({ now: page, block: block });
  //     } else {
  //       pagenation = { ...pagenationData, now: page };
  //     }
  //     getPage(page);
  //     setPagenationData(pagenation);
  //   },
  //   [pagenationData, getPage]
  // );

  // const getClinicDataAndAreaId = useCallback(
  //   (page: number, areaId?: string, max?: number) => {
  //     getClinics(page, areaId);
  //     setPagenationData({ now: 0, block: 0 });
  //     // if (max) {
  //     //   setAreaIdState({ id: areaId, max: max });
  //     // }
  //   },
  //   [getClinics]
  // );

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://platform.twitter.com/widgets.js";
  //   document.body.appendChild(script);
  //   // アンマウント時に一応scriptタグを消しておく
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  if (!clinics) return <LoadingIcon />;
  return (
    <Box textAlign={"center"}>
      <BgImgH1 title={title} />
      <Flex justifyContent={"space-evenly"} wrap={"wrap"} my="2rem">
        <Flex
          as="a"
          cursor={"pointer"}
          border={!areaId ? "4px" : "1px"}
          w={"8rem"}
          h={"5rem"}
          m={"1rem"}
          alignItems={"center"}
          justifyContent={"center"}
          fontSize={"1.2rem"}
          href={"/clinic/1"}
          // onClick={() => getClinicDataAndAreaId(0, undefined, defaultMax)}
        >
          <Text>全ての区域</Text>
        </Flex>
        {/* {!areaIdState.id ? <Box fontSize={"1.3rem"}>▼</Box> : ""} */}
        {area.map((data, int) => (
          <AreaBox
            key={int}
            area={data.area}
            fontSize={"1.2rem"}
            description={data.description || ""}
            arrow={areaId === data.id ? true : false}
            onClick={() => router.push(`/clinic${data.url}/1`)}
            // onClick={() =>
            //   getClinicDataAndAreaId(0, data.id, data.registrationNumber)
            // }
          />
        ))}
      </Flex>
      {/* <Adsense /> */}
      <Pagenation
        max={areaMax}
        take={numOfTakeData}
        nowPage={page}
        pageBlock={Math.floor(page / 5)}
        onClickNumber={(page: number, block?: number) => getPage(page)}
      >
        {/* <Box mt={"2rem"}>
          <Checkbox colorScheme="yellow" value={}>系列クリニックをまとめる</Checkbox>
        </Box> */}
        <HStack
          spacing={"1rem"}
          m="3rem 1rem"
          alignItems={"flex-start"}
          justifyContent={"space-evenly"}
        >
          <Stack
            w={{ md: "55rem", sm: "100%" }}
            // maxW={{
            //   md: "80%",
            //   // "60rem",
            //   sm: "100%",
            // }}
            spacing={"3rem"}
          >
            {clinics.map((data, int) => (
              <PlanCard clinic={data} key={int} />
            ))}
          </Stack>
          <Box display={{ md: "block", sm: "none" }} w="22rem" minW="15em">
            <UnderLineItemBox title="最新情報" fontSize="1em">
              <Stack spacing={"3rem"}>
                {twitter.map((account, i) => (
                  <TwitterBox
                    key={i}
                    account={account.code}
                    clinicId={account.clinicId}
                    height="30em"
                  />
                ))}
              </Stack>
            </UnderLineItemBox>
            <Box mt="5rem">
              <UnderLineItemBox title="キャンペーン・おすすめ" fontSize="1em">
                <Stack spacing={"3rem"} mt={"1rem"}>
                  {instagram.map((data, i) => (
                    <InstagramBox key={i} account={data.code} />
                  ))}
                </Stack>
              </UnderLineItemBox>
            </Box>
          </Box>
        </HStack>
      </Pagenation>
      {/* <Adsense /> */}
    </Box>
  );
};
export default ClinicListTemplate;
