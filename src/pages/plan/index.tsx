import { Button, Flex, Box } from "@chakra-ui/react";
import {
  AboutCategory,
  BaseParts,
  Clinic,
  Instagram,
  OriginCategory,
} from "@prisma/client";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import InstagramBox from "components/InstagramBox";
import { PlanSearchBox } from "components/organisms/box/PlanSearchBox";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { defaultDataService } from "services/app/defaultDataService";
import { OrderPlanIdNameService } from "services/app/orderPlanIdNameService";
import fetcher from "services/fetcher";
import { instagramService } from "services/orm/instagramService";
import {
  aboutCategoryService,
  basePartsService,
  originCategoryService,
} from "services/service";
import useSWR from "swr";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";

import { IdAndNameDto } from "types/IdAndNameDto";
import style from "../../../styles/Home.module.css";

type Props = {
  originCategories: OriginCategory[];
  aboutCategories: AboutCategory[];
  baseParts: BaseParts[];
  defaultOrderData: OrderPlanIdName;
  instagram: (Instagram & {
    clinic: Clinic;
  })[];
};

const { defaultOrderPlanIdName } = defaultDataService();
const { getInstagramRamdom } = instagramService();
export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const originCategories = await originCategoryService.getAllOriginCategory();
  const aboutCategories = await aboutCategoryService.getAboutCategoryByOriginId(
    originCategories[0].id
  );
  const baseParts = await basePartsService.getAllBasePartsByAboutId(
    aboutCategories[0].id
  );

  const instagram = await getInstagramRamdom(2);
  const defaultOrderData = defaultOrderPlanIdName;
  return {
    props: {
      originCategories,
      aboutCategories,
      baseParts,
      defaultOrderData,
      instagram,
    },
  };
};

const SearchSalon: NextPage<Props> = (props) => {
  const {
    originCategories,
    aboutCategories,
    baseParts,
    defaultOrderData,
    instagram,
  } = props;
  const router = useRouter();

  const [change, setChange] = useState<string>(style.fade);
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

  if (!originCategories || !aboutCategories || !baseParts)
    return <LoadingIcon />;
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
      <Box mx="auto" w={{ md: "60%", sm: "95%" }} my="3em">
        <PlanSearchBox
          orderPlan={defaultOrderData}
          originCategories={originCategories}
          aboutCategories={aboutCategories}
          baseParts={baseParts}
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
