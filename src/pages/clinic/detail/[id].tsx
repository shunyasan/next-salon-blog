import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AboutCategory,
  Clinic,
  ClinicOpeningHours,
  ClinicOption,
} from "@prisma/client";
import ClinicTemplate from "components/templete/pages/clinic/ClinicTemplate";
import { ClinicDetailCard } from "components/organisms/board/ClinicDetailCard";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ClinicService } from "services/orm/clinic-service";
import useSWR from "swr";
import { IdAndNameDto } from "types/IdAndNameDto";
import { PriceDto } from "types/PriceDto";
import { useCallback, useEffect, useState } from "react";
import { OriginCategiryId } from "enums/OriginCategiryIdEnum";
import { AbobutCategiryId } from "enums/AbobutCategiryIdEnum";
import fetcher from "services/fetcher";
import Head from "next/head";
import { ClinicPlanCard } from "components/organisms/board/ClinicPlanCard";
import { Layout } from "components/templete/lauouts/Layout";
import {
  aboutCategoryService,
  clinicService,
  idAndNameService,
  priceService,
} from "services/service";

type Props = {
  clinicData: Clinic & {
    clinicOption: ClinicOption | null;
    clinicOpeningHours: ClinicOpeningHours[];
  };
  origin: IdAndNameDto[];
  aboutCategory: AboutCategory[];
  price: PriceDto[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const datas: Clinic[] = await clinicService.getAllClinics();
  const paths = datas.map((data) => `/clinic/detail/${data.id}`);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const param = params && params.id;
  const id = param && typeof param === "string" ? param : "";
  const clinicData = await clinicService.getOneClinic(id);

  const origin: IdAndNameDto[] = await idAndNameService.getAllOriginCategory();
  const aboutCategory: AboutCategory[] =
    await aboutCategoryService.getAboutCategoryByOriginId(origin[0].id);
  const price: PriceDto[] = await priceService.getPriceByClinic(
    id,
    aboutCategory[0].id
  );

  // const clinicData: Clinic = await fetcher(`${thisURL}api/clinics/${id}`);
  return {
    props: {
      clinicData: clinicData,
      origin,
      aboutCategory,
      price,
    },
  };
};

const ClinicDetail: NextPage<Props> = ({
  clinicData,
  origin,
  aboutCategory,
  price,
}) => {
  // const [selectTab, setSelectTab] = useState<string>("クリニック概要");

  // const changeTab = (tab: string) => {
  //   setSelectTab(tab);
  // };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectTab, setSelectTab] = useState<string>("TOP");
  // const [originData, setOriginData] = useState<IdAndNameDto[]>([]);
  // const [priceData, setPriceData] = useState<PriceDto[]>([]);
  // const [gender, setGender] = useState<string>();
  // const [modalPrice, setModalPrice] = useState<PriceDto>();
  // const [selectedAboutId, setSelectedAboutId] = useState<string>(
  //   AbobutCategiryId.upperFace
  // );
  const [originId, setOriginId] = useState<string>(OriginCategiryId.face);

  const { data: aboutCategoryData, error: err_abo } = useSWR<AboutCategory[]>(
    `/api/about-categories/originId/${originId}`,
    fetcher,
    {
      fallbackData: aboutCategory,
    }
  );

  const { data: priceData, error: err_pri } = useSWR<PriceDto[]>(
    `/api/prices/clinic/${clinicData.id}?aboutId=${
      aboutCategoryData?.length ? aboutCategoryData[0].id : aboutCategory[0].id
    }`,
    fetcher,
    {
      fallbackData: price,
    }
  );

  const tab: { text: string; url: string }[] = [
    { text: "TOP", url: "#top" },
    { text: "オプションサービス", url: "#option" },
    { text: "契約・支払い", url: "#payment" },
    { text: "アクセス", url: "#access" },
    { text: "料金", url: "#fee" },
    { text: "予約情報・SNS", url: "#sns" },
    { text: "Youtube", url: "#youtube" },
  ];

  const changeTab = useCallback(async (text: string) => {
    setOriginId(text);
    setSelectTab(text);
    // const data = await getAboutCategory(originId);
    // changeAboutCategory(data[0].id);
  }, []);

  // const changeAboutCategory = useCallback(async (aboutId: string) => {
  //   // await getPrices(aboutId);
  //   setSelectedAboutId(aboutId);
  // }, []);

  // const openPlanDetailModal = useCallback(
  //   async (price: PriceDto) => {
  //     setModalPrice(price);
  //     onOpen();
  //   },
  //   [onOpen]
  // );

  return (
    <>
      <Head>
        <title>{clinicData.name} | あなたのための脱毛</title>
        <meta name="description" content={clinicData.name + "の詳細です"} />
      </Head>
      <Box
        my={"3rem"}
        mx={"auto"}
        // justifyContent={"center"}
        textAlign={"center"}
        w={{ md: "70%", sm: "95%" }}
      >
        <Flex
          mb={"3rem"}
          justifyContent={"space-between"}
          display={{ md: "flex", sm: "block" }}
        >
          <Text as="h1" fontSize={"1.5rem"}>
            {clinicData.name}
          </Text>
          <Box mt={{ md: "0", sm: "1.5em" }}>
            <Link
              w="100%"
              href={clinicData.url || ""}
              _hover={{ textDecoration: "none" }}
              _focus={{ outline: "none" }}
              isExternal
            >
              <Button
                size={"lg"}
                px={{ md: "4em", sm: "0" }}
                w={{ md: "inherit", sm: "70%" }}
                variant="base"
              >
                公式サイト
              </Button>
            </Link>
          </Box>
        </Flex>
        <Box shadow={"0 4px 8px 2px rgb(180,180,180)"} id="top">
          <Flex
            justifyContent={"space-evenly"}
            pos="sticky"
            top="0"
            id="navTop"
            wrap={"wrap"}
          >
            {tab.map((data, i) => (
              <Flex
                as="a"
                key={i}
                fontSize={{ md: "inherit", sm: "0.8em" }}
                flexGrow={1}
                justifyContent="center"
                p={{ md: "1em", sm: ".5em 1em" }}
                transition={"0.5s"}
                cursor={"pointer"}
                href={data.url}
                onClick={() => changeTab(data.text)}
                color={selectTab !== data.text ? "inherit" : "originGold"}
                bg={selectTab !== data.text ? "#ccc" : "originWhite"}
                _hover={{
                  bg: selectTab !== data.text ? "#eee" : "",
                  transition: "0.5s",
                }}
              >
                {data.text}
              </Flex>
            ))}
            {/* 以降追加したい項目
          <Box>施術の流れ</Box>
          <Box>施術についての詳細</Box>
         <Box>SNS</Box> */}
          </Flex>
          <Flex p={"1em"} justifyContent={"center"}>
            <Box
              m={{ md: "2em", sm: "2em 0" }}
              w={{ md: "75%", sm: "100%" }}
              mx={"auto"}
            >
              <ClinicDetailCard
                clinicData={clinicData}
                originData={origin}
                aboutCategoryData={aboutCategory}
                priceData={priceData || []}
              />
            </Box>
          </Flex>
          {/* <Adsense /> */}
          <Box py={"1.5em"}>
            <Link
              w="100%"
              href={clinicData.url || ""}
              _hover={{ textDecoration: "none" }}
              _focus={{ outline: "none" }}
              isExternal
            >
              <Button size={"lg"} w={{ md: "30%", sm: "70%" }} variant="base">
                公式サイト
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ClinicDetail;
