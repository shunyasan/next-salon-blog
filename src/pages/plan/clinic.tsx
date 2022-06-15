import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/layout";
import { CompleteBadge } from "components/atoms/badge/CompleteBadge";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { AboutPartsSelectCard } from "components/organisms/box/AboutPartsSelectCard";
import { ClinicSearchCard } from "components/organisms/box/ClinicSearchCard";
import { GenderCard } from "components/organisms/box/GenderCard";
import { OriginPartsSelectCard } from "components/organisms/box/OriginPartsSelectCard";
import { PartsCard } from "components/organisms/box/PartsCard";
import { PlanSearchCard } from "components/organisms/box/PlanSearchCard";
import { YourselfCard } from "components/organisms/box/YourselfCard";
import OrderSalonPage from "components/templete/pages/plan/OrderSalonPage";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  createQueryString,
  getQueryOrderPlan,
} from "services/app/parameter/CreateParameterHooks";
import { PageQuery } from "types/app/PageQuery";
import { QueryOrderPlan } from "types/app/QueryOrderPlan";
import style from "../../../styles/Home.module.css";

type Props = {
  queryOrderPlan: QueryOrderPlan;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const query = createQueryString(context.query);
  const queryOrderPlan = getQueryOrderPlan(query);
  return {
    props: { queryOrderPlan: queryOrderPlan },
  };
};

const SearchSalon: NextPage<Props> = (props) => {
  const { queryOrderPlan } = props;
  const router = useRouter();

  // const [showPage, setShowPage] = useState<number>(0);
  // const [queryOrderPlan, setQueryOrderPlan] = useState<QueryOrderPlan>();
  const [pageQuery, setPageQuery] = useState<PageQuery>({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
  });

  const createPageQuery = (query: string, page: number) => {
    const queryData: any = pageQuery;
    queryData[page] = query;
    setPageQuery(queryData);
  };

  // 次ボタン　パラメーター
  const selectParamsData = (query: string, page: number) => {
    // setChange(style.slide);
    createPageQuery(query, page);
    const queryString = createQueryString(router.query);
    const decode = decodeURI(queryString);
    // setPrevParamsData(decode);
    const createParams = `${decode}${query}`;
    const encode = encodeURI(createParams);
    // setShowPage(page || 0);

    router.push({
      pathname: "/plan/plan",
      search: encode,
    });
  };

  // // 戻るボタン
  // const prevClick = async () => {
  //   const queryData: any = pageQuery;
  //   const page = showPage - 1;
  //   const query = queryData[page];

  //   for (const key in pageQuery) {
  //     if (showPage <= Number(key)) {
  //       queryData[key] = "";
  //     }
  //   }
  //   setPageQuery(queryData);

  //   // setChange("");
  //   setShowPage(page < 0 ? 0 : page);
  //   router.push({
  //     pathname: "/plan",
  //     search: query,
  //   });
  //   // 編集前
  //   // setNewParams("");
  // };

  // // 最後の条件ボタン
  // const FindPlanLastCondition = (query: string) => {
  //   const queryString = createQueryString(router.query);
  //   const decode = decodeURI(queryString);
  //   router.push({
  //     pathname: "/plan/search",
  //     search: decode + query,
  //   });
  // };

  if (!queryOrderPlan) return <LoadingIcon />;
  return (
    <>
      <Head>
        <title>条件を選択 | あなたのための脱毛</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめのプランを検索します。安い/痛くないと言った要望や、顔/全身/VIOの中でも、クリニックにごとの施術範囲の違いを指定して検索できます。"
        />
      </Head>
      <OrderSalonPage showPage={5}>
        <ClinicSearchCard
          setQueryData={(query) => selectParamsData(query, 6)}
        />
        {/* <Adsense /> */}
      </OrderSalonPage>
    </>
  );
};
export default SearchSalon;
