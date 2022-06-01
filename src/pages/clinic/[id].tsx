import { Box, Checkbox, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { ClinicPlanCard } from "components/organisms/board/ClinicPlanCard";
import { ClinicSummaryCard } from "components/organisms/board/ClinicSummaryCard";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { useParams } from "react-router-dom";
import fetcher from "services/api/fetcher";
import useSWR from "swr";
import { Clinic } from "types/api/Clinic";

type Props = {
  param: string;
};

// export const getStaticProps: GetStaticProps = async (context) => {
//   const param = context.params ? context.params.id : "";
//   const data = param && typeof param === "string" ? param : "";

//   // const getData = fetcher(`/api/clinics/${data}`);
//   return {
//     props: {
//       // fallback: {
//       //   "/api/clinics/": getData,
//       // },
//       param: data,
//     },
//   };
// };

const ClinicDetail: NextPage = () => {
  // const { param } = props;
  // const param = useParams<{ id: string }>();
  // const { getOneClinic } = ClinicApi();

  const router = useRouter();
  // const [clinicData, setClinicData] = useState<Clinic>();
  const [selectTab, setSelectTab] = useState<string>("クリニック概要");

  const { data: clinicData, error: err_cli } = useSWR<Clinic>(
    `/api/clinics/${router.query.id}`,
    fetcher
  );

  // const getOneClinicFunc = useCallback(
  //   async (clinicId: string) => {
  //     const data = await getOneClinic(clinicId);
  //     title(data.name);
  //     setClinicData(data);
  //   },
  //   [getOneClinic, title]
  // );

  const changeTab = useCallback((tab: string) => {
    setSelectTab(tab);
  }, []);

  // useEffect(() => {
  //   getOneClinicFunc(param.id);
  // }, [param, getOneClinicFunc]);

  return (
    <>
      <Head>
        <title>{clinicData?.name} | あなたのための脱毛</title>
        <meta name="description" content={clinicData?.name + "の詳細です"} />
      </Head>
      <Stack
        my={"3rem"}
        mx={"auto"}
        // justifyContent={"center"}
        textAlign={"center"}
        maxW={"60em"}
      >
        {clinicData && (
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
        )}
      </Stack>
    </>
  );
};
export default ClinicDetail;
