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
import { ActionEnum, Clinic } from "@prisma/client";
import { ClinicDetailCard } from "components/organisms/board/ClinicDetailCard";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { LoadingModalIcon } from "components/atoms/icons/LoadingModalIcon";
import { ChangeBgTab } from "components/atoms/tab/ChangeBgTab";
import { RelationClinic } from "types/RelationClinic";
import { clinicRepository } from "services/common/repository";
import { ActionService } from "services/actionSearvice";

type Props = {
  clinicData: RelationClinic;
  // origin: IdAndNameDto[];
  // aboutCategory: AboutCategory[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const datas: Clinic[] = await clinicRepository.getAll();
  const men = datas.map((data) => `/men/clinic/detail/${data.id}`);
  const lady = datas.map((data) => `/lady/clinic/detail/${data.id}`);
  const paths = men.concat(lady);

  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const param = params && params.id;
  const id = param && typeof param === "string" ? param : "";
  const clinicData: RelationClinic = await clinicRepository.getOneClinic(id);
  // const origin: IdAndNameDto[] =
  //   await originCategoryRepository.getIdAndNameByClinicId(id);
  // const prices = await getAllByClinic("ORC000001", id, "女性");

  // const clinicData: Clinic = await fetcher(`${thisURL}api/clinics/${id}`);
  return {
    props: {
      clinicData: clinicData,
      // origin,
      // aboutCategory,
      // price,
      // prices,
    },
  };
};

const ClinicDetail: NextPage<Props> = ({
  clinicData,
  // origin,
  // aboutCategory,
  // price,
  // prices,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createActionApi } = ActionService();

  const [selectTab, setSelectTab] = useState<string>("TOP");
  // const [originId, setOriginId] = useState<string>(OriginCategiryId.face);
  // const [gender, setGender] = useState<string>("女性");

  // const { data: priceData, error: err_pri } = useSWR<PriceByAboutCategory[]>(
  //   `/api/price-by-about-category?originId=${originId}&clinicId=${clinicData.id}&gender=${gender}`,
  //   fetcher,
  //   {
  //     fallbackData: prices,
  //   }
  // );

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
  ];

  // if (!priceData) return <LoadingModalIcon />;

  return (
    <>
      <Head>
        <title>{clinicData.name} | 脱毛コンサルタント</title>
        <meta name="description" content={clinicData.name + "の詳細です"} />
      </Head>
      <LoadingModalIcon />
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
              onClick={() =>
                createActionApi(
                  ActionEnum.external,
                  JSON.stringify({ clinic: clinicData.name })
                )
              }
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
            zIndex={"100"}
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
                // originData={origin}
                // aboutCategoryData={aboutCategory}
                // priceData={priceData || []}
                // prices={priceData}
                // onClickOriginId={(originId: string) => setOriginId(originId)}
                // onClickGender={(gender: string) => setGender(gender)}
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
