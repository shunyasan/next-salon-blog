import { Box, Text, Flex } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { Button, Image, Center, Stack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { OrderPlan } from "types/app/OrderPlan";
import { PriceDto } from "types/api/dto/PriceDto";
import { createQuery } from "services/app/prices/price";
import { useRouter } from "next/router";
import fetcher from "services/orm/fetcher";
import { changeOrderPlanToOrderPlanIdName } from "services/app/order-plan-id-name/order-plan-id-name";
import {
  createQueryString,
  getQueryOrderPlanInSearch,
  OrderPlanToOrderPlan,
} from "services/app/parameter/CreateParameterHooks";
import { IncludePartsAndCategoryPriceDto } from "types/api/dto/IncludePartsAndCategoryPriceDto";
import getCountPrice from "pages/api/prices/max-count";
import { SearchResultCard } from "components/organisms/box/SearchResultCard";
import { BaseButton } from "components/atoms/button/BaseButton";
import { Pagenation } from "components/templete/pagenation/Pagenation";
import { PlanCard } from "components/organisms/board/PlanCard";
import useSWR from "swr";
import Head from "next/head";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
import { OriginCategoryService } from "services/orm/origin-category/get";
import { AboutCategoryService } from "services/orm/about-categories/get";
import { BasePartsService } from "services/orm/base-parts/get";
import { PriceService } from "services/orm/prices/get";

const numOfTakeData = 10;
const priceService = new PriceService();
const originService = new OriginCategoryService();
const aboutService = new AboutCategoryService();
const partsService = new BasePartsService();

type Props = {
  planParam: string;
  orderPlanData: OrderPlan;
  orderDataIdName: OrderPlanIdName;
  title: string;
  firstPrices: PriceDto[];
  firstMaxValue: number;
};

const createTitle = (idName: OrderPlanIdName) => {
  const data = Object.entries(idName).map(([key, value]) => value.name);
  const res = data.reduce((a, b) => a + "," + b);
  return res;
};

const createOrderDataIdName = async (orderPlanData: OrderPlan) => {
  const orderDataIdName = changeOrderPlanToOrderPlanIdName(orderPlanData);
  const origin: IdAndNameDto = await originService.getOriginCategoryIdAndName(
    orderDataIdName.originParts.id
  );
  const about: IdAndNameDto = await aboutService.getAboutCategoryIdAndName(
    orderDataIdName.AboutCategory.id
  );
  const parts: IdAndNameDto = await partsService.getBasePartsIdAndName(
    orderDataIdName.parts.id
  );
  orderDataIdName.originParts = origin;
  orderDataIdName.AboutCategory = about;
  orderDataIdName.parts = parts;
  return orderDataIdName;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  //クエリ作成
  const query = createQueryString(context.query);
  const orderPlanData = getQueryOrderPlanInSearch(query);
  const planParam = createQuery(orderPlanData);
  const reqOrder = OrderPlanToOrderPlan(orderPlanData);

  //データ取得
  const firstPrices = await priceService.getPriceOrderPlan(reqOrder, {
    take: numOfTakeData,
    skip: 0,
  });
  const firstMaxValue = await priceService.getCountMaxPlan(reqOrder);
  const orderDataIdName = await createOrderDataIdName(orderPlanData);
  // タイトル作成
  const title = createTitle(orderDataIdName);
  return {
    props: {
      planParam,
      orderPlanData,
      orderDataIdName,
      title,
      firstPrices,
      firstMaxValue,
    },
  };
};

const SalonList: NextPage<Props> = (props) => {
  const {
    planParam,
    orderPlanData,
    orderDataIdName,
    title,
    firstPrices,
    firstMaxValue,
  } = props;

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

  const { data: price = firstPrices, error: err_pri } = useSWR<PriceDto[]>(
    `/api/prices?${planParam}&take=${numOfTakeData}&skip=${
      numOfTakeData * pagenationData.now
    }`,
    fetcher
  );

  const { data: maxValue = firstMaxValue, error: err_max } = useSWR<number>(
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
      <Center w={"100%"}>
        {maxValue > 0 ? (
          <Pagenation
            max={maxValue}
            take={numOfTakeData}
            nowPage={pagenationData.now}
            pageBlock={pagenationData.block}
            onClickNumber={(page: number, block?: number) =>
              getPageNumber(page, block)
            }
          >
            <Stack
              w={{ md: "55rem", sm: "100%" }}
              justifyContent={"center"}
              spacing={"1.2em"}
              my={"1em"}
            >
              {orderDataIdName &&
                price.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    orderDataIdName={orderDataIdName}
                  />
                ))}
            </Stack>
          </Pagenation>
        ) : (
          <Box my={"3rem"}>
            <Text>こちらのプランは見つかりませんでした。</Text>
            <Text>「条件を変更」をご利用ください</Text>
          </Box>
        )}
      </Center>
      {/* <Adsense /> */}
    </Stack>
  );
};

export default SalonList;
