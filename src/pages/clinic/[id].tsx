import { Box, Checkbox, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Clinic, ClinicOpeningHours, ClinicOption } from "@prisma/client";
import { ClinicPlanCard } from "components/organisms/board/ClinicPlanCard";
import { ClinicSummaryCard } from "components/organisms/board/ClinicSummaryCard";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClinicService } from "services/orm/clinics/get";
import fetcher from "services/orm/fetcher";
import useSWR from "swr";

type Props = {
  clinicData: Clinic & {
    clinicOption: ClinicOption | null;
    clinicOpeningHours: ClinicOpeningHours[];
  };
};

const clinicService = new ClinicService();

export const getStaticPaths: GetStaticPaths = async () => {
  const datas: Clinic[] = await clinicService.getAllClinics();
  const paths = datas.map((data) => `/clinic/${data.id}`);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const param = params && params.id;
  const id = param && typeof param === "string" ? param : "";
  const clinicData = await clinicService.getOneClinic(id);
  // const clinicData: Clinic = await fetcher(`${thisURL}api/clinics/${id}`);
  return {
    props: {
      // fallback: {
      //   "/api/clinics/": getData,
      // },
      clinicData: clinicData,
    },
  };
};

const ClinicDetail: NextPage<Props> = ({ clinicData }) => {
  // const { param } = props;
  // const param = useParams<{ id: string }>();
  // const { getOneClinic } = ClinicApi();

  // const router = useRouter();
  // const [clinicData, setClinicData] = useState<Clinic>();
  const [selectTab, setSelectTab] = useState<string>("クリニック概要");

  // const { data: clinicData, error: err_cli } = useSWR<Clinic>(
  //   `/api/clinics/${router.query.id}`,
  //   fetcher
  // );

  const changeTab = (tab: string) => {
    setSelectTab(tab);
  };

  return (
    <>
      <Head>
        <title>{clinicData.name} | あなたのための脱毛</title>
        <meta name="description" content={clinicData.name + "の詳細です"} />
      </Head>
      <Stack
        my={"3rem"}
        mx={"auto"}
        // justifyContent={"center"}
        textAlign={"center"}
        maxW={"60em"}
      >
        {/* {clinicData && ( */}
        <>
          <Text mb={"1rem"} fontSize={"1.5rem"}>
            {clinicData.name}
          </Text>
          <Stack
            spacing={"0"}
            justifyContent={"space-evenly"}
            shadow={"0 4px 8px 2px rgb(180,180,180)"}
          >
            <Flex justifyContent={"space-evenly"}>
              {[
                "クリニック概要",
                // "オプションサービス",
                "プラン詳細",
                // "脱毛機器",
              ].map((text, i) => (
                <Box
                  key={i}
                  width={{ md: "50%", sm: "50%" }}
                  p={"1em"}
                  bg={selectTab !== text ? "#888" : ""}
                  transition={"0.5s"}
                  cursor={"pointer"}
                  _hover={{
                    bg: selectTab !== text ? "#aaa" : "",
                    transition: "0.5s",
                  }}
                  onClick={() => changeTab(text)}
                >
                  {text}
                </Box>
              ))}
              {/* 以降追加したい項目
              <Box>施術の流れ</Box>
            <Box>施術についての詳細</Box>
            <Box>SNS</Box> */}
            </Flex>
            <HStack spacing={"0"} p={"1em"} justifyContent={"center"}>
              <Box m={{ md: "2em", sm: "2em 0" }} w={"100%"}>
                {/* クリニック概要 */}
                {selectTab === "クリニック概要" && (
                  <ClinicSummaryCard clinicData={clinicData} />
                )}
                {/* オプションサービス
              {selectTab === "オプションサービス" && (
                <Box m={"2em"} w={"100%"}>
                  <ClinicOptionCard clinicData={clinicData} />
                </Box>
              )} */}
                {/* プラン詳細 */}
                {selectTab === "プラン詳細" && (
                  <ClinicPlanCard clinicData={clinicData} />
                )}
                {/* プラン詳細 */}
              </Box>
            </HStack>
            {/* <Adsense /> */}
          </Stack>
        </>
        {/* )} */}
      </Stack>
    </>
  );
};
export default ClinicDetail;
