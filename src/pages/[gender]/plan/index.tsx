import { Button, Flex, Box } from "@chakra-ui/react";
import { Instagram } from "@prisma/client";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import InstagramBox from "components/InstagramBox";
import { PlanSearchBox } from "components/organisms/box/PlanSearchBox";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { defaultData } from "services/common/defaultData";
import { InstagramRepository } from "services/repository/InstagramRepository";
import { OrderPlanIdName } from "types/OrderPlanIdName";
import { Gender } from "types/Gender";

type Props = {
  // originCategories: OriginCategory[];
  // aboutCategories: AboutCategory[];
  // baseParts: BaseParts[];
  defaultOrderData: OrderPlanIdName;
  instagram: Instagram[];
};

const { defaultOrderPlanIdName } = defaultData();
const { getInstagramRamdom } = InstagramRepository();

export const getStaticPaths: GetStaticPaths = async () => {
  const arr: Gender[] = ["men", "lady"];
  const paths = arr.map((ge) => `/${ge}/plan`);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  // const originCategories =
  //   await originCategoryRepository.getAllOriginCategory();
  // const aboutCategories =
  //   await aboutCategoryRepository.getAllAboutCategoryByOriginId(
  //     originCategories[0].id
  //   );
  // const baseParts = await basePartsRepository.getAllBasePartsByAboutId(
  //   aboutCategories[0].id
  // );

  const instagram = await getInstagramRamdom(2);
  const defaultOrderData = defaultOrderPlanIdName;
  return {
    props: {
      // originCategories,
      // aboutCategories,
      // baseParts,
      defaultOrderData,
      instagram,
    },
  };
};

const SearchSalon: NextPage<Props> = (props) => {
  const {
    // originCategories,
    // aboutCategories,
    // baseParts,
    defaultOrderData,
    instagram,
  } = props;
  const router = useRouter();

  return (
    <>
      <Head>
        <title>プランを探す | 脱毛コンサルタント</title>
        <meta
          name="description"
          content="「渋谷・表参道・原宿」などの首都圏からおすすめのプランを検索します。安い/痛くないと言った要望や、顔/全身/VIOの中でも、クリニックにごとの施術範囲の違いを指定して検索できます。"
        />
      </Head>
      <BgImgH1 title="プランを探す" />
      {/* <LoadingModalIcon /> */}
      <Box mx="auto" w={{ md: "60%", sm: "95%" }} my="3em">
        <PlanSearchBox
          orderPlan={defaultOrderData}
          // originCategories={originCategories}
          // aboutCategories={aboutCategories}
          // baseParts={baseParts}
        />
        <Flex mt="2rem" justifyContent={"space-around"} wrap="wrap">
          {instagram.map((data, i) => (
            <Box key={i} w={{ md: "45%", sm: "95%" }}>
              <InstagramBox instagram={data} />
            </Box>
          ))}
        </Flex>
      </Box>
      {/* <Adsense /> */}
    </>
  );
};
export default SearchSalon;
