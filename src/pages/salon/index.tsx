import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/layout";
import { CompleteBadge } from "components/atoms/badge/CompleteBadge";
import { AboutPartsSelectCard } from "components/organisms/box/AboutPartsSelectCard";
import { ClinicSearchCard } from "components/organisms/box/ClinicSearchCard";
import { GenderCard } from "components/organisms/box/GenderCard";
import { OriginPartsSelectCard } from "components/organisms/box/OriginPartsSelectCard";
import { PartsCard } from "components/organisms/box/PartsCard";
import { PlanSearchCard } from "components/organisms/box/PlanSearchCard";
import { YourselfCard } from "components/organisms/box/YourselfCard";
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
  getQuery: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const query = createQueryString(context.query);
  return {
    props: { getQuery: query },
  };
};

const SearchSalon: NextPage<Props> = (props) => {
  const { getQuery } = props;
  const router = useRouter();

  const [change, setChange] = useState<string>(style.fade);
  const [prevParamsData, setPrevParamsData] = useState<string>("?");
  const [showPage, setShowPage] = useState<number>(0);
  const [queryOrderPlan, setQueryOrderPlan] = useState<QueryOrderPlan>();
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
    setChange(style.slide);
    createPageQuery(query, page);
    const queryString = createQueryString(router.query);
    const decode = decodeURI(queryString);
    setPrevParamsData(decode);
    const createParams = `${decode}${query}`;
    const encode = encodeURI(createParams);
    setShowPage(page || 0);

    router.push({
      pathname: "/salon",
      search: encode,
    });
  };

  // 戻るボタン
  const prevClick = async () => {
    const queryData: any = pageQuery;
    const page = showPage - 1;
    const query = queryData[page];

    for (const key in pageQuery) {
      if (showPage <= Number(key)) {
        queryData[key] = "";
      }
    }
    setPageQuery(queryData);

    setChange("");
    setShowPage(page < 0 ? 0 : page);
    router.push({
      pathname: "/salon",
      search: query,
    });
    // 編集前
    // setNewParams("");
  };

  // 最後の条件ボタン
  const FindPlanLastCondition = (query: string) => {
    const queryString = createQueryString(router.query);
    const decode = decodeURI(queryString);
    router.push({
      pathname: "/salon/search",
      search: decode + query,
    });
  };

  // 検索ボタン
  // const findPlan = async () => {
  //   const queryString = createQueryString(router.query);
  //   router.push({
  //     pathname: "/salon/search",
  //     search: queryString,
  //   });
  // };

  const transitionTop = () => {
    setShowPage(0);
    setChange(style.fade);
    router.push("/salon");
  };

  useEffect(() => {
    const orderPlanViewCard = getQueryOrderPlan(getQuery);
    setQueryOrderPlan(orderPlanViewCard);
  }, [getQuery]);

  return (
    <>
      <Box textAlign="center" m={8}>
        <Head>
          <title>条件を選択 | あなたのための脱毛</title>
          <meta
            name="description"
            content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめのプランを検索します。安い/痛くないと言った要望や、顔/全身/VIOの中でも、クリニックにごとの施術範囲の違いを指定して検索できます。"
          />
        </Head>
        <Center my={"1rem"} fontSize={"1.5rem"}>
          プランを探す
        </Center>
        <HStack justifyContent={"center"} wrap={"wrap"}>
          {[...Array(7)].map((_, i) => (
            <CompleteBadge
              key={i}
              number={i + 1}
              selected={showPage >= i}
              mx={"5px"}
              circle={{ md: "2.5rem", sm: "2rem" }}
            />
          ))}
        </HStack>
      </Box>
      {/* 毛量を選択
      {showPage === 5 && queryOrderPlan ? (
        <HairCard setHairData={(query) => FindPlanLastCondition(query)} />
      ) : null}
      {/* 肌色を選択 */}
      {/* {showPage === 4 && queryOrderPlan ? (
        <SkinCollorCard
          setSkinCollorData={(query) => selectParamsData(query, 6)}
        />
      ) : null}  */}

      {/* プラン情報を選択 */}
      {showPage === 6 && queryOrderPlan ? (
        <PlanSearchCard
          setQueryData={(query) => FindPlanLastCondition(query)}
        />
      ) : null}
      {/* クリニック情報を選択 */}
      {showPage === 5 && queryOrderPlan ? (
        <ClinicSearchCard
          setQueryData={(query) => selectParamsData(query, 6)}
        />
      ) : null}
      {/* 自身の情報を選択 */}
      {showPage === 4 && queryOrderPlan ? (
        <YourselfCard setQueryData={(query) => selectParamsData(query, 5)} />
      ) : null}
      {/* 部位別を選択 */}
      {showPage === 3 && queryOrderPlan ? (
        <PartsCard
          setPartsData={(query) => selectParamsData(query, 4)}
          orderPlan={queryOrderPlan}
        />
      ) : null}
      {/* 大まかな部位を選ぶ */}
      {showPage === 2 && queryOrderPlan ? (
        <AboutPartsSelectCard
          setAboutPartsSelectData={(query) => selectParamsData(query, 3)}
          orderPlan={queryOrderPlan}
        />
      ) : null}
      {/* カテゴリを選ぶ */}
      {showPage === 1 && queryOrderPlan ? (
        <OriginPartsSelectCard
          setOriginPartsSelectData={(query) => selectParamsData(query, 2)}
          orderPlan={queryOrderPlan}
        />
      ) : null}
      {/* 性別を選択する */}
      {showPage === 0 ? (
        <GenderCard
          setGenderData={(query) => selectParamsData(query, 1)}
          setAnimation={change}
        />
      ) : null}
      <Box m="2em" textAlign="center">
        {showPage === 0 || (
          <Button mx="7" onClick={prevClick} variant={"secBase"}>
            戻る
          </Button>
        )}
      </Box>
      {/* {showPage > 2 && (
        <Box>
          <Center m="2em" textAlign="center">
            <Button
              mx="7"
              onClick={findPlan}
              // disabled={newParams === ""}
              variant={"base"}
            >
              検索
            </Button>
          </Center>
        </Box>
      )} */}
      <Center m="2em">
        <Button variant={"secBase"} onClick={transitionTop}>
          最初からやり直す
        </Button>
      </Center>
      {/* <Adsense /> */}
    </>
  );
};
export default SearchSalon;
