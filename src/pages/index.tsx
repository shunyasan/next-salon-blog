import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { Adsense } from "components/Adsense";
import { FeatureBoxList } from "components/organisms/lists/FeatureBoxList";
import { HomeSearchBoxList } from "components/organisms/lists/HomeSearchBoxList";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";
import { FeatureService } from "services/orm/features/get";
import fetcher from "services/orm/fetcher";
import { getRandomImg } from "services/app/resources/SearchSalonHooks";
import useSWR, { SWRConfig } from "swr";
import { FeatureDto } from "types/api/dto/FeatureDto";
import { TopResource } from "../../resorces/TopResource";
import { getFeatureString } from "../services/app/features/feature";
import { FeatureViewData } from "../types/app/FeatureViewData";

type Props = {
  // data: FeatureViewData[];
  image: string;
  feature: FeatureViewData[];
};
const feature = new FeatureService();

const getAllFeatureFunc = async () => {
  const data: FeatureDto = await feature.getAllFeature();
  return getFeatureString(data);
};

export const getStaticProps: GetStaticProps = async () => {
  const feature = await getAllFeatureFunc();
  const img = getRandomImg();
  return {
    props: {
      feature: feature,
      image: img,
    },
  };
};

const Home: NextPage<Props> = ({ image, feature }) => {
  const router = useRouter();

  const pushLink = (url: string) => {
    router.push(`/${url}`);
  };

  return (
    // <SWRConfig value={{ fallback }}>
    <Box>
      <Head>
        <title>あなたのための脱毛</title>
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
            <Text>東京都の激戦5区からほぼ全てのクリニックを分析。</Text>
            <Text>決して安くはない経験だからこそ、</Text>
            <Text>あなたのための正しい脱毛を。</Text>
          </Stack>
        </Box>
        <Image
          src={TopResource.topImg}
          w={{ md: "100%", sm: "90rem" }}
          h={{ md: "100%", sm: "18rem" }}
          objectFit={"cover"}
          boxShadow="2xl"
          alt="TOP"
        />
      </Flex>
      <Box>
        <Box w={"80%"} mt={"4rem"} mx={"auto"}>
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
        </Box>
        <Box mt={"4rem"} borderBottom={"1px"}></Box>
        <Box display={"inline-block"} ml={"3rem"}>
          <Box w={"100%"} borderTop={"4px"} borderColor={"#000"}></Box>
          <Text fontSize={"1.5rem"} display={"inline-block"}>
            検索
          </Text>
        </Box>
        <HomeSearchBoxList />
        <Box mt={"4rem"} borderBottom={"1px"}></Box>
        <Box display={"inline-block"} ml={"3rem"}>
          <Box w={"100%"} borderTop={"4px"} borderColor={"#000"}></Box>
          <Text fontSize={"1.5rem"} display={"inline-block"}>
            NEWS
          </Text>
        </Box>
        <Box w="80%" m={"auto"}>
          <Box>リリースしました</Box>
        </Box>
        <Box mt={"4rem"} borderBottom={"1px"}></Box>
        {/* <Adsense /> */}
        <Box display={"inline-block"} ml={"3rem"}>
          <Box w={"100%"} borderTop={"4px"} borderColor={"#000"}></Box>
          <Text fontSize={"1.5rem"} display={"inline-block"}>
            特集
          </Text>
        </Box>
        <Box w={"80%"} mx={"auto"}>
          {feature.map((feature, i) => (
            <Box key={i}>
              <Text fontSize={"1.2rem"} fontWeight={"bold"} m={"0.5rem"}>
                {feature.title}
              </Text>
              <FeatureBoxList
                clinics={feature.datas}
                onClick={() => pushLink(feature.path)}
                itemWidth={"15rem"}
                image={image}
              />
            </Box>
          ))}
        </Box>
        {/* <Adsense /> */}
      </Box>
    </Box>
    // </SWRConfig>
  );
};
export default Home;
