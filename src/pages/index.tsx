import { Box, Flex, HStack, Image, Link, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { Adsense } from "components/Adsense";
import { HomeSearchBoxList } from "components/organisms/lists/HomeSearchBoxList";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import fetcher from "services/fetcher";
import { getRandomImg } from "services/app/resources/SearchSalonHooks";
import useSWR, { SWRConfig } from "swr";
import { FeatureDto } from "types/FeatureDto";
import { TopResource } from "../../resorces/TopResource";
import { getFeatureString } from "../services/app/features/feature";
import { FeatureViewData } from "../types/app/FeatureViewData";
import { UnderLineText } from "components/atoms/text/UnderLineText";
import { Layout } from "components/templete/lauouts/Layout";
import { featureService } from "services/service";
import Twitter from "components/Twitter";
import { tweet } from "services/tweet";
import { CopyrightImageBox } from "components/molecules/box/CopyrightImageBox";
import Instagram from "components/Instagram";

type Props = {
  // data: FeatureViewData[];
  image: string[];
  feature: FeatureViewData[];
  topImg: string;
};

const getAllFeatureFunc = async () => {
  const data: FeatureDto = await featureService.getAllFeature();
  return getFeatureString(data);
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const feature = await getAllFeatureFunc();
  const imgs = [...Array(6)].map((_, i) => getRandomImg());
  const topImg = TopResource.topImg;
  return {
    props: {
      feature: feature,
      image: imgs,
      topImg,
    },
  };
};

const Home: NextPage<Props> = ({ image, feature, topImg }) => {
  const router = useRouter();
  const [gender, setGender] = useState<string>();

  const pushLink = (url: string) => {
    router.push(`/${url}`);
  };

  return (
    <Box>
      <Head>
        <title>脱毛コンサルタント</title>
        <meta
          name="description"
          content="自分に合った脱毛プランを検索できるサイトです。東京都内の医療脱毛激戦区である「渋谷・恵比寿・新宿・銀座・六本木・池袋」大手から優良小規模まで、ほぼ全てのクリニックから分析したプランをおすすめします。"
        />
      </Head>
      <Flex pos="relative">
        <Box
          pos="absolute"
          top={{ md: "25%", sm: "15%" }}
          left={{ md: "10%", sm: "5%" }}
          fontSize={{ md: "1.5rem", sm: "1rem" }}
          fontWeight="bold"
          color={"#fff"}
        >
          <Stack
            spacing={"5px"}
            w={{ md: "100%", sm: "80%" }}
            // bg={"rgba(170,170,170,0.5)"}
            textShadow={"1px 1px 2px #000"}
          >
            {/* <Text>決して安くはない経験だからこそ、</Text> */}
            <Text>あなたのための脱毛プランをご提案。</Text>
          </Stack>
        </Box>
        <Image
          src={topImg}
          w={{ md: "100%", sm: "90rem" }}
          h={{ md: "25rem", sm: "12rem" }}
          objectFit={"cover"}
          boxShadow="2xl"
          alt="TOP"
        />
      </Flex>
      {/* <Box w={{ md: "80%", sm: "95%" }} mx="auto"> */}
      {/* <Box w={"80%"} mt={"4rem"} mx={"auto"}>
          <Flex wrap={"wrap"} justifyContent={"center"} alignItems={"center"}>
            <Stack
              p={{ md: "1rem", sm: "1rem 0" }}
              spacing={"1rem"}
              fontSize={"0.9rem"}
            >
              <Text>度々生じてしまうトラブルやアンマッチ。</Text>
              <Text>
                決して安くはない経験だからこそ、あなたのための正しい脱毛を。
              </Text>
              <Text textAlign={"center"}></Text>
            </Stack>
          </Flex>
        </Box> */}
      <Box w={{ md: "80%", sm: "95%" }} mx="auto" mt="4rem">
        <UnderLineText
          fontSize={{ md: "1.5rem", sm: "1.2rem" }}
          as="h2"
          title={"検索"}
        />
        <HomeSearchBoxList />
      </Box>
      <Box w={{ md: "80%", sm: "95%" }} mx="auto" mt="4rem">
        <UnderLineText
          fontSize={{ md: "1.5rem", sm: "1.2rem" }}
          as="h2"
          title={"リアルタイム情報"}
        />
        <Flex justifyContent={"center"} wrap={{ md: "nowrap", sm: "wrap" }}>
          {tweet.map((account, i) => (
            <Box
              key={i}
              mx=".5em"
              width={{ md: "25em", sm: "18em" }}
              mt={{ md: "2em", sm: "1em" }}
            >
              <Box>
                <Text fontWeight={"bold"}>【{account.name}】</Text>
              </Box>
              <Twitter
                account={account.id}
                clinicId={account.clinicId}
                height="400px"
              />
            </Box>
          ))}
        </Flex>
      </Box>
      {/* <Box mt={"4rem"} borderBottom={"1px"}></Box> 
        <Box display={"inline-block"} ml={"3rem"}>
          <Box w={"100%"} borderTop={"4px"} borderColor={"#000"}></Box>
          <Text fontSize={"1.5rem"} display={"inline-block"}>
            NEWS
          </Text>
        </Box>
        <Box w="80%" m={"auto"}>
          <Box>リリースしました</Box>
        </Box> */}
      <Box mt="4rem" w={{ md: "80%", sm: "95%" }} mx="auto">
        <UnderLineText
          fontSize={{ md: "1.5rem", sm: "1.2rem" }}
          as="h2"
          title={"特集"}
        />
      </Box>
      <Stack
        spacing={{ md: "2em", sm: "1.5em" }}
        w={{ md: "70%", sm: "100%" }}
        mx="auto"
        mt={{ md: "2em", sm: "1.5em" }}
      >
        {feature.map((feature, i) => (
          <>
            <Box key={i}>
              <Text
                fontSize={"1.2rem"}
                fontWeight={"bold"}
                mb={"0.5rem"}
                ml="1rem"
              >
                {feature.title}
              </Text>
              <Flex
                // w={"40rem"}
                // spacing={"1em"}
                wrap={"nowrap"}
                overflowX={"scroll"}
                // py="1em"
              >
                {feature.datas.map((data, i) => (
                  <>
                    <Box
                      minW={{ md: "15rem", sm: "10rem" }}
                      h={{ md: "18rem", sm: "14rem" }}
                      shadow="xl"
                      cursor="pointer"
                      onClick={() => router.push(`/${data.url}`)}
                      key={i}
                      m=".5em"
                    >
                      <CopyrightImageBox
                        src={image[i]}
                        // src={TopResource.clinicImg}
                        authority={"urk"}
                        fontSize={"0.7em"}
                      />
                      <Stack p={{ md: "1em", sm: ".5em" }}>
                        <Text
                          fontWeight={"bold"}
                          fontSize={{ md: "0.8em", sm: "0.7em" }}
                        >
                          {data.name}
                        </Text>
                        <Text pt={"0.6em"} fontSize={"0.6em"}>
                          {data.nearestStation}
                        </Text>
                      </Stack>
                    </Box>
                  </>
                ))}
              </Flex>
            </Box>
            {i === 2 && (
              <Flex justifyContent={"space-around"} wrap="wrap">
                <Box w={{ md: "45%", sm: "95%" }}>
                  <Instagram account="CeZ47dwpjd_" />
                </Box>
                <Box w={{ md: "45%", sm: "95%" }}>
                  <Instagram account="Ceu2OGWpcWw" />
                </Box>
              </Flex>
            )}
          </>
        ))}
        <Flex justifyContent={"space-around"} wrap="wrap">
          <Box w={{ md: "45%", sm: "95%" }}>
            <Instagram account="CeZ47dwpjd_" />
          </Box>
          <Box w={{ md: "45%", sm: "95%" }}>
            <Instagram account="Ceu2OGWpcWw" />
          </Box>
        </Flex>
      </Stack>
      {/* <Adsense /> */}
    </Box>
  );
};
export default Home;
