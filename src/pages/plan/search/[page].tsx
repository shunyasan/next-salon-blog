import { Box, Text, Flex } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { Button, Image, HStack, Stack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { OrderPlanIdName } from "types/OrderPlanIdName";
import { PriceDto } from "types/PriceDto";
import { useRouter } from "next/router";
import { SearchResultCard } from "components/organisms/box/SearchResultCard";
import { Pagenation } from "components/templete/pagenation/Pagenation";
import useSWR from "swr";
import Head from "next/head";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
// import { tweet } from "services/tweet";
import { PricePlanCard } from "components/organisms/board/PricePlanCard";
import { MobileSearchCondotionBox } from "components/organisms/box/MobileSearchCondotionBox";
import { TitleValue } from "types/TitleValue";
import {
  AboutCategory,
  BaseParts,
  Clinic,
  Instagram,
  OriginCategory,
  Twitter,
} from "@prisma/client";
import InstagramBox from "components/InstagramBox";
import TwitterBox from "components/TwitterBox";
import { UnderLineItemBox } from "components/molecules/box/UnderLineItemBox";
import { PlanSortBox } from "components/molecules/box/PlanSortBox";
import { IdAndNameDto } from "types/IdAndNameDto";
import { PlanSortSelect } from "components/atoms/select/PlanSortSelect";
import { OrderPlanQueryService } from "services/orderPlanQueryService";
import {
  aboutCategoryRepository,
  basePartsRepository,
  originCategoryRepository,
} from "services/common/repository";
import { InstagramRepository } from "services/repository/InstagramRepository";
import { twitterRepository } from "services/repository/twitterRepository";
import { priceDtoRepository } from "services/repository/priceDtoRepository";
import { titleValueService } from "services/titleValueService";
import { orderPlanIdNameRepository } from "services/repository/orderPlanIdNameRepository";

const numOfTakeData = 10;

type Props = {
  // orderPlanQuery: OrderPlanQuery;
  page: number;
  orderDataIdName: OrderPlanIdName;
  title: string;
  price: PriceDto[];
  maxValue: number;
  condition: TitleValue[];
  twitter: Twitter[];
  instagram: Instagram[];
  // allParts: {
  //   originCategories: OriginCategory[];
  //   aboutCategories: AboutCategory[];
  //   baseParts: BaseParts[];
  // };
};

const { changeQueryToOrderPlanIdName } = orderPlanIdNameRepository();
const { createParameter, getOrderPlanQuery } = OrderPlanQueryService();
const { getTwittersRamdom } = twitterRepository();
const { getInstagramRamdom } = InstagramRepository();
const { getCountMaxPlan, getPriceOrderPlan } = priceDtoRepository();
const { getModalSearchConditionBoxData } = titleValueService();

const createTitle = (idName: OrderPlanIdName) => {
  const data = Object.entries(idName).map(([key, value]) => {
    return value ? value.name : undefined;
  });
  const res = data.reduce((a, b) => (b ? a + "," + b : ""));
  return res;
};

// const getAllParts = async () => {
//   // const originCategories: OriginCategory[] = [];
//   const aboutCategories: AboutCategory[] = [];
//   const baseParts: BaseParts[] = [];

//   const originCategories =
//     await originCategoryRepository.getAllOriginCategory();
//   // const aboutCategories =
//   //   await aboutCategoryRepository.getAllAboutCategoryByOriginId(
//   //     originCategories[0].id
//   //   );
//   // const baseParts = await basePartsRepository.getAllBasePartsByAboutId(
//   //   aboutCategories[0].id
//   // );
//   return { originCategories, aboutCategories, baseParts };
// };

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  //クエリ作成
  const num = context.params ? Number(context.params.page) : 1;
  const page = num - 1 >= 0 ? num - 1 : 0;
  const orderPlanQuery = getOrderPlanQuery(context.query);

  //データ取得
  const price = await getPriceOrderPlan(orderPlanQuery, {
    take: numOfTakeData,
    skip: page * numOfTakeData,
  });
  const maxValue = await getCountMaxPlan(orderPlanQuery);
  // const allParts = await getAllParts();

  const orderDataIdName = await changeQueryToOrderPlanIdName(orderPlanQuery);
  // タイトル作成・条件結果の文字列
  const title = createTitle(orderDataIdName) || "";
  const condition = getModalSearchConditionBoxData(orderDataIdName);
  const twitter = await getTwittersRamdom(3);
  const instagram = await getInstagramRamdom(4);

  return {
    props: {
      page,
      orderDataIdName,
      title,
      price,
      maxValue,
      condition,
      // allParts,
      twitter,
      instagram,
    },
  };
};

const SalonList: NextPage<Props> = (props) => {
  const {
    page,
    orderDataIdName,
    title,
    price,
    maxValue,
    condition,
    twitter,
    instagram,
    // allParts,
  } = props;

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeSort = (idName: IdAndNameDto) => {
    orderDataIdName.sort = idName;
    const query = createParameter(orderDataIdName);
    router.push({ pathname: `/plan/search/${page + 1}`, query: query });
  };

  const getPageNumber = useCallback(
    async (page: number, block?: number) => {
      const query = router.query;
      router.push({ pathname: `/plan/search/${page + 1}`, query: query });
    },
    [router]
  );

  useEffect(() => {
    setLoading(false);
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
  }, [router]);

  if (!price || (!maxValue && maxValue !== 0)) return <LoadingIcon />;
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
      {loading && <LoadingIcon />}
      <Box mt="2rem" w="95%" mx="auto" display={{ md: "none", sm: "block" }}>
        <MobileSearchCondotionBox
          orderPlan={orderDataIdName}
          // resetPages={serPagenationDefault}
          condition={condition}
          partsName={orderDataIdName.parts.name || "未指定"}
          // originCategories={allParts.originCategories}
          // aboutCategories={allParts.aboutCategories}
          // baseParts={allParts.baseParts}
          // setLoading={() => setLoading(true)}
        />
        <Flex mt="1em" justifyContent={"center"}>
          <Button as="a" variant={"secBase"} href="/plan">
            最初からやり直す
          </Button>
        </Flex>
      </Box>
      <Box textAlign={"center"}>
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
            {maxValue > 0 ? (
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
            ) : (
              <Box>
                <Text>こちらのプランは見つかりませんでした。</Text>
                <Text>「条件を変更」をご利用ください</Text>
              </Box>
            )}
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
                  // originCategories={allParts.originCategories}
                  // aboutCategories={allParts.aboutCategories}
                  // baseParts={allParts.baseParts}
                />
                <Box my={"1rem"}>
                  <Button as="a" variant={"secBase"} href="/plan">
                    最初からやり直す
                  </Button>
                </Box>
              </Box>
              <UnderLineItemBox title="最新情報" fontSize="1em">
                <Stack spacing={"3rem"}>
                  {twitter.map((account, i) => (
                    <TwitterBox
                      key={i}
                      account={account.code}
                      clinicId={account.clinicId}
                      height="500px"
                    />
                  ))}
                </Stack>
              </UnderLineItemBox>
              <Box mt="5rem">
                <UnderLineItemBox title="キャンペーン・おすすめ" fontSize="1em">
                  <Stack mt="1em">
                    {instagram.map((data, i) => (
                      <InstagramBox key={i} account={data.code} />
                    ))}
                  </Stack>
                </UnderLineItemBox>
              </Box>
            </Stack>
          </HStack>
        </Pagenation>
      </Box>
      {/* <Adsense /> */}
    </Box>
  );
};

export default SalonList;
