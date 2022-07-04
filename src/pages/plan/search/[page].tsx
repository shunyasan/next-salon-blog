import { Box, Text, Flex } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { Button, Image, HStack, Stack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { PriceDto } from "types/PriceDto";
import { useRouter } from "next/router";
import { SearchResultCard } from "components/organisms/box/SearchResultCard";
import { Pagenation } from "components/templete/pagenation/Pagenation";
import useSWR from "swr";
import Head from "next/head";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import { tweet } from "services/tweet";
import { PricePlanCard } from "components/organisms/board/PricePlanCard";
import {
  aboutCategoryService,
  basePartsService,
  orderPlanIdNameService,
  orderPlanQueryService,
  originCategoryService,
  priceService,
  titleValueService,
} from "services/service";
import { MobileSearchCondotionBox } from "components/organisms/box/MobileSearchCondotionBox";
import { TitleValue } from "types/app/TitleValue";
import { AboutCategory, BaseParts, OriginCategory } from "@prisma/client";
import Instagram from "components/Instagram";
import Twitter from "components/Twitter";
import { UnderLineItemBox } from "components/molecules/box/UnderLineItemBox";
import { PlanSortBox } from "components/molecules/box/PlanSortBox";
import { IdAndNameDto } from "types/IdAndNameDto";
import { createParameter } from "services/app/orderPlanQueryService";
import { PlanSortSelect } from "components/atoms/select/PlanSortSelect";

const numOfTakeData = 10;

type Props = {
  // orderPlanQuery: OrderPlanQuery;
  page: number;
  orderDataIdName: OrderPlanIdName;
  title: string;
  price: PriceDto[];
  maxValue: number;
  condition: TitleValue[];
  allParts: {
    originCategories: OriginCategory[];
    aboutCategories: AboutCategory[];
    baseParts: BaseParts[];
  };
};

const createTitle = (idName: OrderPlanIdName) => {
  const data = Object.entries(idName).map(([key, value]) => {
    return value ? value.name : undefined;
  });
  const res = data.reduce((a, b) => (b ? a + "," + b : ""));
  return res;
};

const getAllParts = async () => {
  const originCategories = await originCategoryService.getAllOriginCategory();
  const aboutCategories = await aboutCategoryService.getAboutCategoryByOriginId(
    originCategories[0].id
  );
  const baseParts = await basePartsService.getAllBasePartsByAboutId(
    aboutCategories[0].id
  );
  return { originCategories, aboutCategories, baseParts };
};

// const createOrderDataIdName = async (orderPlanQuery: OrderPlanQuery) => {
//   const orderDataIdName = changeOrderPlanToOrderPlanIdName(orderPlanQuery);
//   const origin: IdAndNameDto =
//     await originCategoryService.getOriginCategoryIdAndName(
//       orderDataIdName.originParts.id
//     );
//   const about: IdAndNameDto =
//     await aboutCategoryService.getAboutCategoryIdAndName(
//       orderDataIdName.aboutCategory.id
//     );
//   const parts: IdAndNameDto = await basePartsService.getBasePartsIdAndName(
//     orderDataIdName.parts.id
//   );
//   orderDataIdName.originParts = origin;
//   orderDataIdName.aboutCategory = about;
//   orderDataIdName.parts = parts;
//   return orderDataIdName;
// };

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  //クエリ作成
  const num = context.params ? Number(context.params.page) : 1;
  const page = num - 1 >= 0 ? num - 1 : 0;
  const orderPlanQuery = orderPlanQueryService.getOrderPlanQuery(context.query);
  // const query = createQueryString(context.query);
  // const orderPlanQuery = getQueryOrderPlanInSearch(query);
  // const swrQuery = createQuery(orderPlanQuery);
  // const reqOrder = OrderPlanToOrderPlan(orderPlanQuery);

  //データ取得
  const price = await priceService.getPriceOrderPlan(orderPlanQuery, {
    take: numOfTakeData,
    skip: page * numOfTakeData,
  });
  const maxValue = await priceService.getCountMaxPlan(orderPlanQuery);
  const allParts = await getAllParts();

  const orderDataIdName =
    await orderPlanIdNameService.changeQueryToOrderPlanIdName(orderPlanQuery);
  // タイトル作成・条件結果の文字列
  const title = createTitle(orderDataIdName) || "";
  const condition =
    titleValueService.getModalSearchConditionBoxData(orderDataIdName);
  return {
    props: {
      page,
      orderDataIdName,
      title,
      price,
      maxValue,
      condition,
      allParts,
    },
  };
};

const SalonList: NextPage<Props> = (props) => {
  const { page, orderDataIdName, title, price, maxValue, condition, allParts } =
    props;

  const router = useRouter();

  // const [orderDataIdName, setOrderDataIdName] = useState<OrderPlanIdName>();
  // const [orderPlanQuery, setOrderPlanData] = useState<OrderPlan>();
  // const [planData, setPlanData] = useState<PriceDto[]>([]);
  // const [maxValue, setMaxvalue] = useState<number | undefined>();
  // const [pagenationData, setPagenationData] = useState<{
  //   now: number;
  //   block: number;
  // }>({
  //   now: 0,
  //   block: 0,
  // });

  // const { data: price, error: err_pri } = useSWR<PriceDto[]>(
  //   `/api/prices?${planParam}&take=${numOfTakeData}&skip=${
  //     numOfTakeData * pagenationData.now
  //   }`,
  //   fetcher,
  //   {
  //     fallbackData: firstPrices,
  //   }
  // );

  // const { data: maxValue, error: err_max } = useSWR<number>(
  //   `/api/prices/max-count?${planParam}`,
  //   fetcher,
  //   {
  //     fallbackData: firstMaxValue,
  //   }
  // );

  // const serPagenationDefault = () => {
  // setMaxvalue(undefined);
  // setPagenationData({ now: 0, block: 0 });
  // setPlanData([]);
  // };

  const onChangeSort = (idName: IdAndNameDto) => {
    orderDataIdName.sort = idName;
    const query = createParameter(orderDataIdName);
    router.push({ pathname: `/plan/search/${page + 1}`, query: query });
  };

  const getPageNumber = useCallback(
    async (page: number, block?: number) => {
      // setPlanData([]);
      // getTreatmentPriceFunc(orderPlanQuery, numOfTakeData, numOfTakeData * page);
      // if (block || block === 0) {
      //   setPagenationData({ now: page, block: block });
      // } else {
      //   setPagenationData({ ...pagenationData, now: page });
      // }

      const query = router.query;
      router.push({ pathname: `/plan/search/${page + 1}`, query: query });
    },
    [router]
  );

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://platform.twitter.com/widgets.js";
  //   document.body.appendChild(script);
  //   // アンマウント時に一応scriptタグを消しておく
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  if (!price || (!maxValue && maxValue !== 0) || !allParts)
    return <LoadingIcon />;
  return (
    <Box
      mb={"2rem"}
      // textAlign="center"
      // wrap={"wrap"}
      // justifyContent={"center"}
    >
      <Box>
        <BgImgH1
          title={(orderDataIdName.aboutCategory.name || "体") + "の脱毛"}
        />
      </Box>
      <Head>
        <title>
          {`【${orderDataIdName.aboutCategory.name || "体"}】の脱毛`} |
          脱毛コンサルタント
        </title>
        <meta name="description" content={`【${title}】のプランを検索`} />
      </Head>
      {/* <Adsense /> */}
      <Box mt="2rem" w="95%" mx="auto" display={{ md: "none", sm: "block" }}>
        <MobileSearchCondotionBox
          orderPlan={orderDataIdName}
          // resetPages={serPagenationDefault}
          condition={condition}
          partsName={orderDataIdName.parts.name || "未指定"}
          originCategories={allParts.originCategories}
          aboutCategories={allParts.aboutCategories}
          baseParts={allParts.baseParts}
        />
        <Flex mt="1em" justifyContent={"center"}>
          <Button as="a" variant={"secBase"} href="/plan">
            最初からやり直す
          </Button>
        </Flex>
      </Box>
      <Box textAlign={"center"}>
        {maxValue > 0 ? (
          <Pagenation
            max={maxValue}
            take={numOfTakeData}
            nowPage={page}
            pageBlock={Math.floor(page / 5)}
            onClickNumber={(page: number, block?: number) =>
              getPageNumber(page, block)
            }
          >
            <HStack
              p="3rem 1rem"
              alignItems={"flex-start"}
              justifyContent={"space-evenly"}
            >
              <Stack
                // w={{ md: "65%", sm: "100%" }}
                // w={{ md: "55rem", sm: "100%" }}
                maxW={{ md: "60rem", sm: "100%" }}
                minW={{ md: "30rem", sm: "100%" }}
                justifyContent={"center"}
                spacing={"1.2em"}
              >
                <HStack ml="1em">
                  <Text fontSize={"0.9em"}>並び替え</Text>
                  <Box>
                    <PlanSortSelect
                      idName={orderDataIdName.sort}
                      onChange={(idName: IdAndNameDto) => onChangeSort(idName)}
                    />
                  </Box>
                </HStack>
                {price.map((plan) => (
                  <PricePlanCard
                    key={plan.id}
                    price={plan}
                    orderDataIdName={orderDataIdName}
                  />
                ))}
              </Stack>
              <Stack
                spacing={"3rem"}
                ml={"2rem"}
                // w="25%"
                w="22em"
                minW="18em"
                display={{ md: "flex", sm: "none" }}
              >
                <Box
                //  w={{ md: "24rem", sm: "20rem" }} mx={"auto"}
                >
                  <Text>詳細条件</Text>
                  <SearchResultCard
                    orderPlan={orderDataIdName}
                    // resetPages={serPagenationDefault}
                    originCategories={allParts.originCategories}
                    aboutCategories={allParts.aboutCategories}
                    baseParts={allParts.baseParts}
                  />
                  <Box my={"1rem"}>
                    <Button as="a" variant={"secBase"} href="/plan">
                      最初からやり直す
                    </Button>
                  </Box>
                </Box>
                <UnderLineItemBox title="最新情報" fontSize="1em">
                  <Stack spacing={"3rem"}>
                    {tweet.map((account, i) => (
                      <Twitter
                        key={i}
                        account={account.id}
                        clinicId={account.clinicId}
                        height="400px"
                      />
                    ))}
                  </Stack>
                </UnderLineItemBox>
                <Box mt="5rem">
                  <UnderLineItemBox
                    title="キャンペーン・おすすめ"
                    fontSize="1em"
                  >
                    <Box mt="1em">
                      <Instagram account="CbwwpPYLi18" />
                    </Box>
                  </UnderLineItemBox>
                </Box>
              </Stack>
            </HStack>
          </Pagenation>
        ) : (
          <Box my={"3rem"}>
            <Text>こちらのプランは見つかりませんでした。</Text>
            <Text>「条件を変更」をご利用ください</Text>
          </Box>
        )}
      </Box>
      {/* <Adsense /> */}
    </Box>
  );
};

export default SalonList;
