import { Box, Checkbox, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { FC, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
  clinicId: string;
  clinicName: string;
  selectTab: string;
};

const ClinicTemplate: FC<Props> = ({
  children,
  clinicId,
  clinicName,
  selectTab,
}) => {
  // const [selectTab, setSelectTab] = useState<string>("クリニック概要");

  // const changeTab = (tab: string) => {
  //   setSelectTab(tab);
  // };

  const tab: { text: string; uri: string }[] = [
    {
      text: "クリニック概要",
      uri: "",
    },
    {
      text: "プラン詳細",
      uri: `/plan`,
    },
  ];
  // "オプションサービス",
  // "脱毛機器",

  return (
    <>
      <Head>
        <title>{clinicName} | あなたのための脱毛</title>
        <meta name="description" content={clinicName + "の詳細です"} />
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
            {clinicName}
          </Text>
          <Stack
            spacing={"0"}
            justifyContent={"space-evenly"}
            shadow={"0 4px 8px 2px rgb(180,180,180)"}
          >
            <Flex justifyContent={"space-evenly"}>
              {tab.map((data, i) => (
                <Box
                  as="a"
                  key={i}
                  width={{ md: "50%", sm: "50%" }}
                  p={"1em"}
                  bg={selectTab !== data.text ? "#888" : ""}
                  transition={"0.5s"}
                  cursor={"pointer"}
                  _hover={{
                    bg: selectTab !== data.text ? "#aaa" : "",
                    transition: "0.5s",
                  }}
                  href={`/clinic/detail/${clinicId}${data.uri}`}
                  // onClick={() => changeTab(data.text)}
                >
                  {data.text}
                </Box>
              ))}
              {/* 以降追加したい項目
              <Box>施術の流れ</Box>
            <Box>施術についての詳細</Box>
            <Box>SNS</Box> */}
            </Flex>
            <HStack spacing={"0"} p={"1em"} justifyContent={"center"}>
              <Box m={{ md: "2em", sm: "2em 0" }} w={"100%"}>
                {children}
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
export default ClinicTemplate;
