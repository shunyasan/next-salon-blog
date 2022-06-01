import { Box, Text, Flex } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { Button, Image, Select, Stack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { OrderPlan } from "types/app/OrderPlan";
import { PriceDto } from "types/api/dto/PriceDto";
import { createQuery } from "services/prices/price";
import { useRouter } from "next/router";
import fetcher from "services/api/fetcher";
import { changeOrderPlanToOrderPlanIdName } from "services/order-plan-id-name/order-plan-id-name";
import {
  createQueryString,
  getQueryOrderPlanInSearch,
} from "services/parameter/CreateParameterHooks";
import { IncludePartsAndCategoryPriceDto } from "types/api/dto/IncludePartsAndCategoryPriceDto";
import getCountPrice from "pages/api/prices/max-count";
import { SearchResultCard } from "components/organisms/box/SearchResultCard";
import { BaseButton } from "components/atoms/button/BaseButton";
import { Pagenation } from "components/templete/pagenation/Pagenation";
import { PlanCard } from "components/organisms/board/PlanCard";
import { thisURL } from "services/api/config";
import useSWR from "swr";
import Head from "next/head";

const numOfTakeData = 10;

type Props = {
  planParam: string;
  orderPlanData: OrderPlan;
  orderDataIdName: OrderPlanIdName;
  title: string;
};

const createTitle = (idName: OrderPlanIdName) => {
  const data = Object.entries(idName).map(([key, value]) => value.name);
  const res = data.reduce((a, b) => a + "," + b);
  return res;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const query = createQueryString(context.query);
  const orderPlanData = getQueryOrderPlanInSearch(query);
  const orderDataIdName = changeOrderPlanToOrderPlanIdName(orderPlanData);

  const planParam = createQuery(orderPlanData);
  const title = createTitle(orderDataIdName);
  return {
    props: { planParam, orderPlanData, orderDataIdName, title },
  };
};

const SalonList: NextPage<Props> = (props) => {
  const { planParam, orderPlanData, orderDataIdName, title } = props;

  const router = useRouter();

  // const [orderDataIdName, setOrderDataIdName] = useState<OrderPlanIdName>();
  // const [orderPlanData, setOrderPlanData] = useState<OrderPlan>();
  // const [planData, setPlanData] = useState<PriceDto[]>([]);
  // const [maxValue, setMaxvalue] = useState<number | undefined>();
  const [pagenationData, setPagenationData] = useState<{
    now: number;
    block: number;
  }>({
    now: 0,
    block: 0,
  });

  const { data: price, error: err_pri } =
    useSWR<IncludePartsAndCategoryPriceDto>(
      `/api/prices?${planParam}&take=${numOfTakeData}&skip=${
        numOfTakeData * pagenationData.now
      }`,
      fetcher
    );

  const { data: maxValue, error: err_max } = useSWR<number>(
    `/api/prices/max-count?${planParam}`,
    fetcher
  );

  const serPagenationDefault = () => {
    // setMaxvalue(undefined);
    setPagenationData({ now: 0, block: 0 });
    // setPlanData([]);
  };

  const getPageNumber = useCallback(
    async (page: number, block?: number) => {
      // setPlanData([]);
      // getTreatmentPriceFunc(orderPlanData, numOfTakeData, numOfTakeData * page);
      if (block || block === 0) {
        setPagenationData({ now: page, block: block });
      } else {
        setPagenationData({ ...pagenationData, now: page });
      }
    },
    [pagenationData]
  );

  // const createTitle = useCallback(
  //   (idName: OrderPlanIdName) => {
  //     const data = Object.entries(idName).map(([key, value]) => value.name);
  //     const res = data.reduce((a, b) => a + "," + b);
  //     title(res);
  //   },
  //   [title]
  // );

  // const getTreatmentPrice = async (
  //   orderParams: OrderPlan,
  //   take: number,
  //   skip: number
  // ) => {
  //   const params = createQuery(orderParams, take, skip);
  //   const data = await fetcher(params);
  //   return data;
  // };

  // const getTreatmentPriceFunc = async (
  //   orderParams: OrderPlan,
  //   take: number,
  //   skip: number
  // ) => {
  //   // const data = await getTreatmentPrice(orderParams, take, skip);
  //   const idName = changeOrderPlanToOrderPlanIdName(orderParams);
  //   // idName.originParts = price.originCategory;
  //   // idName.AboutCategory = price.aboutCategory;
  //   // idName.parts = price.baseParts;
  //   // createTitle(idName);
  //   setOrderDataIdName(idName);
  //   // setPlanData(price.prices);
  // };

  // useEffect(() => {
  // const param = getQueryOrderPlanInSearch(search);
  //   getTreatmentPriceFunc(param, numOfTakeData, 0);
  //   setOrderPlanData(param);
  // }, [search, getTreatmentPriceFunc, getQueryOrderPlanInSearch]);

  // useEffect(() => {
  //   if (orderPlanData) {
  //     getMaxDataCount(orderPlanData);
  //   }
  // }, [orderPlanData, getMaxDataCount]);

  return (
    <Stack
      m={"2rem"}
      spacing={"0"}
      textAlign="center"
      wrap={"wrap"}
      justifyContent={"center"}
    >
      <Head>
        <title>{`【${title}"】`} | あなたのための脱毛</title>
        <meta name="description" content={`【${title}】のプランを検索`} />
      </Head>
      <Box w={{ md: "24rem", sm: "20rem" }} mx={"auto"}>
        <Text>検索結果</Text>
        {orderDataIdName && (
          <SearchResultCard
            orderPlan={orderDataIdName}
            resetPages={serPagenationDefault}
          />
        )}
        <Box my={"1rem"}>
          <BaseButton
            text={"最初からやり直す"}
            path={"/salon"}
            size={undefined}
            base={"secBase"}
          />
        </Box>
      </Box>
      {/* <Adsense /> */}
      <Box w={{ md: "55rem", sm: "100%" }} mx={"auto !important"}>
        {maxValue && maxValue > 0 ? (
          <Pagenation
            max={maxValue}
            take={numOfTakeData}
            nowPage={pagenationData.now}
            pageBlock={pagenationData.block}
            onClickNumber={(page: number, block?: number) =>
              getPageNumber(page, block)
            }
          >
            <Stack justifyContent={"center"} spacing={"1.2em"} my={"1em"}>
              {orderDataIdName &&
                price?.prices.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    orderDataIdName={orderDataIdName}
                  />
                ))}
            </Stack>
          </Pagenation>
        ) : (
          ""
        )}
        {price?.prices.length === 0 && (
          <Box my={"3rem"}>
            <Text>こちらのプランは見つかりませんでした。</Text>
            <Text>「条件を変更」をご利用ください</Text>
          </Box>
        )}
      </Box>
      {/* <Adsense /> */}
    </Stack>
  );
};

export default SalonList;
