import { Box, Flex, HStack, Link, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { HomeSearchBoxList } from "components/organisms/lists/HomeSearchBoxList";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { TopResource } from "../../resorces/TopResource";
import { UnderLineText } from "components/atoms/text/UnderLineText";
import InstagramBox from "components/InstagramBox";
import { Clinic, Instagram, Twitter } from "@prisma/client";
import TwitterBox from "components/TwitterBox";
import { InstagramRepository } from "services/repository/InstagramRepository";
import { twitterRepository } from "services/repository/twitterRepository";
import Image from "next/image";
import { LoadingModalIcon } from "components/atoms/icons/LoadingModalIcon";
import { Gender } from "types/Gender";
import { ImageBox } from "components/molecules/box/ImageBox";
import style from "../../styles/Home.module.css";

type Props = {
  // data: FeatureViewData[];
  // imgs: string[];
  // feature: FeatureViewData[];
  topImg: string;
  twitter: Twitter[];
  instagram: Instagram[];
};

const { getTwittersRamdom } = twitterRepository();
const { getInstagramRamdom } = InstagramRepository();

// const getAllFeatureFunc = async () => {
//   const data: FeatureDto = await getAllFeature();
//   return getFeatureString(data);
// };

export const getStaticProps: GetStaticProps<Props> = async () => {
  // const feature = await getAllFeatureFunc();
  // const imgs = getRandomImg();
  // const imgs = [...Array(10)].map((_, i) => getRandomImg());
  const topImg = TopResource.topImg;
  const twitter = await getTwittersRamdom(3);
  const instagram = await getInstagramRamdom(4);
  return {
    props: {
      topImg,
      twitter,
      instagram,
    },
  };
};

const Home: NextPage<Props> = ({
  // imgs,
  // feature,
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
          content="自分に合った脱毛プランを検索できるサイトです。東京都内の医療脱毛激戦区である「渋谷・表参道・原宿」などの首都圏大手から優良小規模まで、ほぼ全てのクリニックから分析したプランをおすすめします。"
        />
      </Head>
      <Flex pos="relative">
        <Box
          pos="absolute"
          top={{ md: "25%", sm: "15%" }}
          left={{ md: "10%", sm: "5%" }}
          fontSize={{ md: "1.5rem", sm: "1.2rem" }}
          fontWeight="bold"
          zIndex={"100"}
          color={"#fff"}
          textShadow={"1px 1px 3px #000"}
          display={{ md: "flex", sm: "block" }}
        >
          {/* <Flex
            w={{ md: "100%", sm: "80%" }}
            bg={"rgba(170,170,170,0.5)"}
          > */}
          {/* <Text>決して安くはない経験だからこそ、</Text> */}
          <Text>あなたのための</Text>
          <Text>脱毛プランをご紹介。</Text>
          {/* </Flex> */}
        </Box>
        <Box
          w={{ md: "100%", sm: "90rem" }}
          h={{ md: "26rem", sm: "16rem" }}
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
            title={"最新情報"}
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
      <Box
        width="100%"
        height="100%"
        position="fixed"
        top="0"
        left="0"
        // onClick={onClose}
        zIndex="100"
        bg="rgba(30,30,30,0.5)"
        className={style.fade}
      >
        <Box
          py="2em"
          px={{ md: "3rem", sm: "1.5rem" }}
          bg="originWhite"
          w={{ md: "70%", sm: "95%" }}
          mx="auto"
          my="2rem"
          textAlign={"center"}
          borderRadius={"sm"}
        >
          <Text fontWeight={"bold"}>あなたの性別を選択してください</Text>
          <Box>
            <Flex justifyContent={"center"}>
              <ImageBox
                img={
                  "https://d4lnyw05kel00.cloudfront.net/image/lady/lady.webp"
                }
                text={"女性"}
                path={"/lady"}
                width={"13em"}
              />
            </Flex>
            <Flex justifyContent={"center"}>
              <ImageBox
                img={"https://d4lnyw05kel00.cloudfront.net/image/men/men.webp"}
                text={"男性"}
                path={"/men"}
                width={"13em"}
              />
            </Flex>
          </Box>
        </Box>
      </Box>
      {/* <Adsense /> */}
    </Box>
  );
};
export default Home;
