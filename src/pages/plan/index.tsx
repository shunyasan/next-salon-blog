import { Button, Flex, Box } from "@chakra-ui/react";
import {
  AboutCategory,
  BaseParts,
  Clinic,
  Instagram,
  OriginCategory,
} from "@prisma/client";
import { LoadingModalIcon } from "components/atoms/icons/LoadingModalIcon";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import InstagramBox from "components/InstagramBox";
import { PlanSearchBox } from "components/organisms/box/PlanSearchBox";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { defaultData } from "services/common/defaultData";
import fetcher from "services/common/fetcher";
import { InstagramRepository } from "services/repository/InstagramRepository";
import {
  aboutCategoryRepository,
  basePartsRepository,
  originCategoryRepository,
} from "services/common/repository";
import useSWR from "swr";
import { OrderPlanIdName } from "types/OrderPlanIdName";

import { IdAndNameDto } from "types/IdAndNameDto";
import style from "../../../styles/Home.module.css";

type Props = {
  // originCategories: OriginCategory[];
  // aboutCategories: AboutCategory[];
  // baseParts: BaseParts[];
  defaultOrderData: OrderPlanIdName;
  instagram: Instagram[];
};

const { defaultOrderPlanIdName } = defaultData();
const { getInstagramRamdom } = InstagramRepository();
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

  const [change, setChange] = useState<string>(style.fade);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [gender, setGender] = useState<string>("女性");
  //配列番号を所持
  // const [orderPlanIdName, setOrderPlanIdName] =
  //   useState<OrderPlanIdName>(defaultOrderData);
  // const [originId, setOriginId] = useState<string>(originCategories[0].id);
  // const [aboutId, setAboutId] = useState<string>(aboutCategoryData[0].id);

  // // 次ボタン　パラメーター
  // const selectParamsData = (query: string) => {
  //   // createPageQuery(query, page);
  //   // setPrevParamsData(decode);
  //   setChange(style.slide);
  //   const queryString = createQueryString(router.query);
  //   const decode = decodeURI(queryString);
  //   const createParams = `${decode}${query}`;
  //   const encode = encodeURI(createParams);
  //   // setShowPage(page || 0);

  //   router.push({
  //     pathname: "/plan/self",
  //     search: encode,
  //   });
  // };

  // useEffect(() => {
  //   aboutCategories && setAboutId(aboutCategories[0].id);
  // }, [aboutCategories]);

  // if (!originCategories || !aboutCategories || !baseParts)
  // return <LoadingModalIcon />;

  // useEffect(() => {
  //   setLoading(false);
  //   router.events.on("routeChangeStart", () => {
  //     setLoading(true);
  //   });
  //   router.events.on("routeChangeComplete", () => {
  //     setLoading(false);
  //   });
  // }, [router]);

  return (
    <>
      <Head>
        <title>プランを探す | 脱毛コンサルタント</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめのプランを検索します。安い/痛くないと言った要望や、顔/全身/VIOの中でも、クリニックにごとの施術範囲の違いを指定して検索できます。"
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
              <InstagramBox account={data.code} />
            </Box>
          ))}
        </Flex>
      </Box>
      {/* <Adsense /> */}
    </>
  );
};
export default SearchSalon;
