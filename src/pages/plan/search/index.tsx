import { Box, Text, Flex } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { Button, Image, Center, Stack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { OrderPlan } from "types/app/OrderPlan";
import { PriceDto } from "types/PriceDto";
import { createQuery } from "services/app/prices/price";
import { useRouter } from "next/router";
import fetcher from "services/fetcher";
import { changeOrderPlanToOrderPlanIdName } from "services/app/order-plan-id-name/order-plan-id-name";
import {
  createQueryString,
  getQueryOrderPlanInSearch,
  OrderPlanToOrderPlan,
} from "services/app/parameter/CreateParameterHooks";
import { IncludePartsAndCategoryPriceDto } from "types/IncludePartsAndCategoryPriceDto";
import getCountPrice from "pages/api/prices/max-count";
import { SearchResultCard } from "components/organisms/box/SearchResultCard";
import { BaseButton } from "components/atoms/button/BaseButton";
import { Pagenation } from "components/templete/pagenation/Pagenation";
import useSWR from "swr";
import Head from "next/head";
import { IdAndNameDto } from "types/IdAndNameDto";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import { tweet } from "services/tweet";
import { PricePlanCard } from "components/organisms/board/PricePlanCard";
import Script from "next/script";
import {
  aboutCategoryService,
  basePartsService,
  originCategoryService,
  priceService,
} from "services/service";

const numOfTakeData = 10;

type Props = {
  planParam: string;
  orderPlanData: OrderPlan;
  orderDataIdName: OrderPlanIdName;
  title: string;
  firstPrices: PriceDto[];
  firstMaxValue: number;
};

const createTitle = (idName: OrderPlanIdName) => {
  const data = Object.entries(idName).map(([key, value]) => {
    return value ? value.name : undefined;
  });
  const res = data.reduce((a, b) => (b ? a + "," + b : ""));
  return res;
};

const createOrderDataIdName = async (orderPlanData: OrderPlan) => {
  const orderDataIdName = changeOrderPlanToOrderPlanIdName(orderPlanData);
  const origin: IdAndNameDto =
    await originCategoryService.getOriginCategoryIdAndName(
      orderDataIdName.originParts.id
    );
  const about: IdAndNameDto =
    await aboutCategoryService.getAboutCategoryIdAndName(
      orderDataIdName.AboutCategory.id
    );
  const parts: IdAndNameDto = await basePartsService.getBasePartsIdAndName(
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
  const title = createTitle(orderDataIdName) || "";
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

  const { data: price, error: err_pri } = useSWR<PriceDto[]>(
    `/api/prices?${planParam}&take=${numOfTakeData}&skip=${
      numOfTakeData * pagenationData.now
    }`,
    fetcher,
    {
      fallbackData: firstPrices,
    }
  );

  const { data: maxValue, error: err_max } = useSWR<number>(
    `/api/prices/max-count?${planParam}`,
    fetcher,
    {
      fallbackData: firstMaxValue,
    }
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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.body.appendChild(script);
    // アンマウント時に一応scriptタグを消しておく
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!price || (!maxValue && maxValue !== 0)) return <LoadingIcon />;
  return (
    <Stack
      mb={"2rem"}
      spacing={"0"}
      textAlign="center"
      wrap={"wrap"}
      justifyContent={"center"}
    >
      <BgImgH1 title="検索結果" />
      <Head>
        <title>{`【${title}"】`} | あなたのための脱毛</title>
        <meta name="description" content={`【${title}】のプランを検索`} />
      </Head>
      {/* <Adsense /> */}
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
          <Flex
            my="3rem"
            alignItems={"flex-start"}
            justifyContent={"space-evenly"}
          >
            <Stack
              w={{ md: "55rem", sm: "100%" }}
              justifyContent={"center"}
              spacing={"1.2em"}
            >
              {orderDataIdName &&
                price.map((plan) => (
                  <PricePlanCard
                    key={plan.id}
                    price={plan}
                    orderDataIdName={orderDataIdName}
                  />
                ))}
            </Stack>
            <Stack spacing={"3rem"} ml={"2rem"}>
              <Box w={{ md: "24rem", sm: "20rem" }} mx={"auto"}>
                <Text>詳細条件</Text>
                {orderDataIdName && (
                  <SearchResultCard
                    orderPlan={orderDataIdName}
                    resetPages={serPagenationDefault}
                  />
                )}
                <Box my={"1rem"}>
                  <BaseButton
                    text={"最初からやり直す"}
                    path={"/plan"}
                    size={undefined}
                    base={"secBase"}
                  />
                </Box>
              </Box>
              {tweet.map((account) => (
                <Box key={account}>
                  <a
                    className="twitter-timeline"
                    data-height="600"
                    href={`https://twitter.com/${account}?ref_src=twsrc%5Etfw`}
                  >
                    Tweets by ${account}
                  </a>
                </Box>
              ))}
            </Stack>
          </Flex>
        </Pagenation>
      ) : (
        <Box my={"3rem"}>
          <Text>こちらのプランは見つかりませんでした。</Text>
          <Text>「条件を変更」をご利用ください</Text>
        </Box>
      )}
      {/* <Adsense /> */}
    </Stack>
  );
};

export default SalonList;
