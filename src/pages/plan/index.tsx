import { Button, Flex, Box } from "@chakra-ui/react";
import { AboutCategory, BaseParts, OriginCategory } from "@prisma/client";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import Instagram from "components/Instagram";
import { GenderPlateBox } from "components/molecules/box/GenderPlateBox";
import { PlanSearchBox } from "components/organisms/box/PlanSearchBox";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  createQueryString,
  getQueryOrderPlan,
} from "services/app/parameter/CreateParameterHooks";
import fetcher from "services/fetcher";
import {
  aboutCategoryService,
  basePartsService,
  orderPlanIdNameService,
  originCategoryService,
} from "services/service";
import useSWR from "swr";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";

import { QueryOrderPlan } from "types/app/QueryOrderPlan";
import { IdAndNameDto } from "types/IdAndNameDto";
import style from "../../../styles/Home.module.css";

type Props = {
  // queryOrderPlan: QueryOrderPlan;
  originCategories: OriginCategory[];
  aboutCategories: AboutCategory[];
  baseParts: BaseParts[];
  defaultOrderData: OrderPlanIdName;
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const originCategories = await originCategoryService.getAllOriginCategory();
  const aboutCategories = await aboutCategoryService.getAboutCategoryByOriginId(
    originCategories[0].id
  );
  const baseParts = await basePartsService.getAllBasePartsByAboutId(
    aboutCategories[0].id
  );

  const defaultOrderData = orderPlanIdNameService.defaultData;
  return {
    props: {
      originCategories,
      aboutCategories,
      baseParts,
      defaultOrderData,
    },
  };
};

const SearchSalon: NextPage<Props> = (props) => {
  const { originCategories, aboutCategories, baseParts, defaultOrderData } =
    props;
  const router = useRouter();

  const [change, setChange] = useState<string>(style.fade);
  // const [gender, setGender] = useState<string>("女性");
  //配列番号を所持
  const [orderPlanIdName, setOrderPlanIdName] =
    useState<OrderPlanIdName>(defaultOrderData);
  // const [originId, setOriginId] = useState<string>(originCategories[0].id);
  // const [aboutId, setAboutId] = useState<string>(aboutCategoryData[0].id);

  // const onClickParts = (partsId: string) => {
  //   const me = `${OrderPlanEnum.gender.query}=${gender}&`;
  //   const origin = `${OrderPlanEnum.originCategory.query}=${originId}&`;
  //   const about = `${OrderPlanEnum.aboutCategory.query}=${aboutId}&`;
  //   const parts = `${OrderPlanEnum.parts.query}=${partsId}&`;
  //   const query = me + origin + about + parts;
  //   selectParamsData(query);
  // };

  // 次ボタン　パラメーター
  const selectParamsData = (query: string) => {
    // createPageQuery(query, page);
    // setPrevParamsData(decode);
    setChange(style.slide);
    const queryString = createQueryString(router.query);
    const decode = decodeURI(queryString);
    const createParams = `${decode}${query}`;
    const encode = encodeURI(createParams);
    // setShowPage(page || 0);

    router.push({
      pathname: "/plan/self",
      search: encode,
    });
  };

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
      <Box mx="auto" w={{ md: "60%", sm: "90%" }} my="3em">
        <PlanSearchBox
          OrderPlan={orderPlanIdName}
          originCategories={originCategories}
          aboutCategories={aboutCategories}
          baseParts={baseParts}
        />
        <Flex mt="2rem" justifyContent={"space-around"} wrap="wrap">
          <Box w={{ md: "45%", sm: "95%" }}>
            <Instagram account="CeZ47dwpjd_" />
          </Box>
          <Box w={{ md: "45%", sm: "95%" }}>
            <Instagram account="Ceu2OGWpcWw" />
          </Box>
        </Flex>
      </Box>
      {/* <Adsense /> */}
    </>
  );
};
export default SearchSalon;
