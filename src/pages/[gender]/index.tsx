import { Box, Flex, HStack, Link, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { HomeSearchBoxList } from "components/organisms/lists/HomeSearchBoxList";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import fetcher from "services/common/fetcher";
import { resourcesData } from "services/common/resourcesData";
import useSWR, { SWRConfig } from "swr";
import { FeatureDto } from "types/FeatureDto";
import { UnderLineText } from "components/atoms/text/UnderLineText";
import { Layout } from "components/templete/lauouts/Layout";
// import Twitter from "components/Twitter";
// import { tweet } from "services/tweet";
import { CopyrightImageBox } from "components/molecules/box/CopyrightImageBox";
import InstagramBox from "components/InstagramBox";
import { Clinic, Instagram, Twitter } from "@prisma/client";
import TwitterBox from "components/TwitterBox";
import StreetView from "components/StreetView";
import { featureDtoRepository } from "services/repository/featureDtoRepository";
import { InstagramRepository } from "services/repository/InstagramRepository";
import { twitterRepository } from "services/repository/twitterRepository";
import { featureViewDataService } from "services/featureViewDataService";
import Image from "next/image";
import { LoadingModalIcon } from "components/atoms/icons/LoadingModalIcon";
import { FeatureViewData } from "types/FeatureViewData";
import { TopResource } from "../../../resorces/TopResource";
import { Gender } from "types/Gender";

type Props = {
  // data: FeatureViewData[];
  imgs: string[];
  feature: FeatureViewData[];
  topImg: string;
  twitter: Twitter[];
  instagram: Instagram[];
};

const { getTwittersRamdom } = twitterRepository();
const { getInstagramRamdom } = InstagramRepository();
const { getAllFeature } = featureDtoRepository();
const { getFeatureString } = featureViewDataService();
const { getRandomImg } = resourcesData();

const getAllFeatureFunc = async () => {
  const data: FeatureDto = await getAllFeature();
  return getFeatureString(data);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const arr: Gender[] = ["men", "lady"];
  const paths = arr.map((ge) => `/${ge}`);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const feature = await getAllFeatureFunc();
  // const imgs = getRandomImg();
  const imgs = [...Array(10)].map((_, i) => getRandomImg());
  const topImg = TopResource.topImg;
  const twitter = await getTwittersRamdom(3);
  const instagram = await getInstagramRamdom(4);
  return {
    props: {
      feature,
      imgs,
      topImg,
      twitter,
      instagram,
    },
  };
};

const Home: NextPage<Props> = ({
  imgs,
  feature,
  topImg,
  twitter,
  instagram,
}) => {
  const router = useRouter();
  const gender = (router.query.gender as Gender) || "lady";

  return (
    <Box>
      <LoadingModalIcon />
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
          zIndex={"100"}
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
        <Box
          w={{ md: "100%", sm: "90rem" }}
          h={{ md: "25rem", sm: "12rem" }}
          boxShadow="2xl"
        >
          <Image
            layout="fill"
            // width={"100%"}
            // height="80%"
            objectFit={"cover"}
            src={topImg}
            alt="TOP"
          />
        </Box>
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
      <Stack
        w={{ md: "80%", sm: "95%" }}
        spacing={{ md: "3em", sm: "2em" }}
        mx="auto"
        mt={{ md: "4rem", sm: "2rem" }}
      >
        <Box>
          <UnderLineText
            fontSize={{ md: "1.5rem", sm: "1.2rem" }}
            as="h2"
            title={"検索"}
          />
          <HomeSearchBoxList />
        </Box>
        <Box>
          <UnderLineText
            fontSize={{ md: "1.5rem", sm: "1.2rem" }}
            as="h2"
            title={"リアルタイム情報"}
          />
          <Flex justifyContent={"center"} wrap={{ md: "nowrap", sm: "wrap" }}>
            {twitter.map((data, i) => (
              <Box
                key={data.id}
                mx=".5em"
                width={{ md: "25em", sm: "18em" }}
                mt={{ md: "2em", sm: "1em" }}
              >
                {/* <Box>
                  <Text fontWeight={"bold"}>【{data.clinic.name}】</Text>
                </Box> */}
                <TwitterBox twitter={data} height="400px" />
              </Box>
            ))}
          </Flex>
        </Box>
        <Box>
          <UnderLineText
            fontSize={{ md: "1.5rem", sm: "1.2rem" }}
            as="h2"
            title={"特集"}
          />
        </Box>
      </Stack>
      <Stack
        spacing={{ md: "2em", sm: "1.5em" }}
        w={{ md: "70%", sm: "100%" }}
        mx="auto"
        mt={{ md: "2em", sm: "1.5em" }}
      >
        {feature.map((feature, i) => (
          <Box key={feature.path}>
            <Box>
              <Box mb={"0.2em"} ml="1rem" alignItems={"center"}>
                <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                  {feature.title}
                </Text>
                <Text
                  as="a"
                  href={`/${gender}/${feature.path}`}
                  color={"originGold"}
                  fontSize={".8em"}
                >
                  すべての一覧
                </Text>
              </Box>
              <Flex
                // w={"40rem"}
                // spacing={"1em"}
                wrap={"nowrap"}
                overflowX={"scroll"}
                // py="1em"
              >
                {feature.datas.map((data, i) => (
                  <Box
                    key={data.id + i}
                    shadow="xl"
                    cursor="pointer"
                    onClick={() =>
                      router.push(`/${gender}/clinic/detail/${data.id}`)
                    }
                    pb="1rem"
                    m=".5em"
                  >
                    <CopyrightImageBox
                      width={"15rem"}
                      height={"10rem"}
                      src={imgs[i]}
                      picture={data.picture[0]}
                      // src={TopResource.clinicImg}
                      fontSize={{ md: "0.4em", sm: ".7em" }}
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
                ))}
              </Flex>
            </Box>
            {i === 2 && (
              <Flex justifyContent={"space-around"} wrap="wrap">
                <Box w={{ md: "45%", sm: "95%" }}>
                  <InstagramBox instagram={instagram[0]} />
                </Box>
                <Box w={{ md: "45%", sm: "95%" }}>
                  <InstagramBox instagram={instagram[1]} />
                </Box>
              </Flex>
            )}
          </Box>
        ))}
        <Flex justifyContent={"space-around"} wrap="wrap">
          <Box w={{ md: "45%", sm: "95%" }}>
            <InstagramBox instagram={instagram[2]} />
          </Box>
          <Box w={{ md: "45%", sm: "95%" }}>
            <InstagramBox instagram={instagram[3]} />
          </Box>
        </Flex>
      </Stack>
      {/* <Adsense /> */}
    </Box>
  );
};
export default Home;
