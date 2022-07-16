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
import { useCallback, useEffect, useState } from "react";
import { OriginCategiryId } from "enums/OriginCategiryIdEnum";
import fetcher from "services/fetcher";
import Head from "next/head";
import { Layout } from "components/templete/lauouts/Layout";
import {
  aboutCategoryService,
  clinicService,
  idAndNameService,
  originCategoryService,
  priceByAboutCategoryService,
  priceService,
} from "services/service";
import { PriceByAboutCategory } from "types/PriceByAboutCategory";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { ChangeBgTab } from "components/atoms/tab/ChangeBgTab";
import { RelationClinic } from "types/RelationClinic";

type Props = {
  clinicData: RelationClinic;
  origin: IdAndNameDto[];
  // aboutCategory: AboutCategory[];
  // price: PriceDto[];
  prices?: PriceByAboutCategory[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const datas: Clinic[] = await clinicService.getAllClinics();
  const paths = datas.map((data) => `/clinic/detail/${data.id}`);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const param = params && params.id;
  const id = param && typeof param === "string" ? param : "";
  const clinicData: RelationClinic = await clinicService.getOneClinic(id);
  console.log(clinicData);
  const origin: IdAndNameDto[] = await idAndNameService.getAllOriginCategory();
  // const aboutCategory: AboutCategory[] =
  //   await aboutCategoryService.getAboutCategoryByOriginId(origin[0].id);
  // const price: PriceDto[] = await priceService.getPriceByClinic(
  //   id,
  //   aboutCategory[0].id
  // );
  const prices = await priceByAboutCategoryService.getAllByClinic(
    "Z000001",
    id,
    "女性"
  );

  // const clinicData: Clinic = await fetcher(`${thisURL}api/clinics/${id}`);
  return {
    props: {
      clinicData: clinicData,
      origin,
      // aboutCategory,
      // price,
      prices,
    },
  };
};

const ClinicDetail: NextPage<Props> = ({
  clinicData,
  origin,
  // aboutCategory,
  // price,
  prices,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectTab, setSelectTab] = useState<string>("TOP");
  // const [originData, setOriginData] = useState<IdAndNameDto[]>([]);
  // const [priceData, setPriceData] = useState<PriceDto[]>([]);
  // const [gender, setGender] = useState<string>();
  // const [modalPrice, setModalPrice] = useState<PriceDto>();
  const [originId, setOriginId] = useState<string>(OriginCategiryId.face);
  const [gender, setGender] = useState<string>("女性");

  const { data: priceData, error: err_pri } = useSWR<PriceByAboutCategory[]>(
    `/api/price-by-about-category?originId=${originId}&clinicId=${clinicData.id}&gender=${gender}`,
    fetcher,
    {
      fallbackData: prices,
    }
  );

  //以降追加したい項目
  //・施術の流れ
  //・施術についての詳細
  //・SNS
  // wrap対策
  const tab1: { text: string; url: string }[] = [
    { text: "TOP", url: "#top" },
    { text: "オプションサービス", url: "#option" },
    { text: "契約・支払い", url: "#payment" },
    { text: "アクセス", url: "#access" },
  ];
  const tab2: { text: string; url: string }[] = [
    { text: "料金", url: "#fee" },
    { text: "予約情報・SNS", url: "#sns" },
    { text: "Youtube", url: "#youtube" },
  ];
  const tab: { text: string; url: string }[] = [
    { text: "TOP", url: "#top" },
    { text: "オプションサービス", url: "#option" },
    { text: "契約・支払い", url: "#payment" },
    { text: "アクセス", url: "#access" },
    { text: "料金", url: "#fee" },
    // 鳥のアイコンだけでも良いかも
    // { text: "予約情報", url: "#sns" },
    // { text: "キャンペーン・おすすめ", url: "#" },
    // { text: "Youtube", url: "#youtube" },
  ];

  if (!priceData) return <LoadingIcon />;

  return (
    <>
      <Head>
        <title>{clinicData.name} | 脱毛コンサルタント</title>
        <meta name="description" content={clinicData.name + "の詳細です"} />
      </Head>
      <Box
        my={"3rem"}
        mx={"auto"}
        // justifyContent={"center"}
        textAlign={"center"}
        // minW={{ md: "40em", sm: "95%" }}
        // maxW={{ md: "60em", sm: "95%" }}
        maxW={{ md: "46em", sm: "95%" }}
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
            zIndex={"200"}
          >
            {tab.map((data, i) => (
              <ChangeBgTab
                key={i}
                selectTab={selectTab}
                value={data.text}
                url={data.url}
                onClick={() => setSelectTab(data.text)}
              />
            ))}
          </Flex>
          <Flex
            pt={"2em"}
            // px={{ md: "2em", sm: "0" }}
            justifyContent={"center"}
          >
            <Box
              // m={{ md: "2em", sm: "2em 0" }}
              // mx={"auto"}
              // w={{ md: "75%", sm: "100%" }}
              w={"100%"}
              // maxW={"43em"}
              // minW={{ md: "30em", sm: "100%" }}
            >
              <ClinicDetailCard
                clinicData={clinicData}
                originData={origin}
                // aboutCategoryData={aboutCategory}
                // priceData={priceData || []}
                prices={priceData}
                onClickOriginId={(originId: string) => setOriginId(originId)}
                onClickGender={(gender: string) => setGender(gender)}
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
