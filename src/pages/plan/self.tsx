import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, Stack, HStack, Text } from "@chakra-ui/layout";
import { CompleteBadge } from "components/atoms/badge/CompleteBadge";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { ImageAndTextBox } from "components/molecules/box/ImageAndTextBox";
import OrderSalonPage from "components/templete/pages/plan/OrderSalonPage";
import { OrderPlanEnum } from "enums/OrderPlanEnum";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";
import {
  createQueryString,
  getQueryOrderPlan,
} from "services/app/parameter/CreateParameterHooks";
import { QueryOrderPlan } from "types/app/QueryOrderPlan";
import { HairResource } from "../../../resorces/HairResource";
import { SkinResource } from "../../../resorces/SkinResource";
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

  const [change, setChange] = useState<string>(style.fade);
  const [selecteSkin, setSelecteSkin] = useState<string>("薄茶色");
  const [selecteHair, setSelecteHair] = useState<string>("標準");
  const [selectePay, setSelectePay] = useState<string>("総額");

  const createQuery = () => {
    const skin = `${OrderPlanEnum.skinCollor.query}=${selecteSkin}&`;
    const hair = `${OrderPlanEnum.hair.query}=${selecteHair}&`;
    const pay = `${OrderPlanEnum.paySystem.query}=${selectePay}&`;
    const query = skin + hair + pay;
    selectParamsData(query);
  };

  // 次ボタン　パラメーター
  const selectParamsData = (query: string) => {
    // setChange(style.slide);
    // createPageQuery(query, page);
    // setPrevParamsData(decode);
    const queryString = createQueryString(router.query);
    const decode = decodeURI(queryString);
    const createParams = `${decode}${query}`;
    const encode = encodeURI(createParams);
    // setShowPage(page || 0);

    router.push({
      pathname: "/plan/clinic",
      search: encode,
    });
  };

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
      <OrderSalonPage showPage={1}>
        <Box className={change ? change : ""}>
          <Box m={6} textAlign="center">
            <Text>あなたの特徴について教えてください</Text>
            <Stack spacing={"2em"} mt={"2rem"}>
              <Box>
                <Text>自身の肌の色を選択してください</Text>
                <Text>
                  ここに説明を入れる。それぞれ選択する人はどんな特徴があるのか
                </Text>
                <Flex mt="1em" wrap={"wrap"} justifyContent={"center"}>
                  <ImageAndTextBox
                    targetValue={selecteSkin}
                    text={"白色"}
                    img={SkinResource.whiteImg}
                    onClick={() => setSelecteSkin("白色")}
                    checkValue={"白色"}
                  />
                  <ImageAndTextBox
                    targetValue={selecteSkin}
                    text={"薄茶色"}
                    img={SkinResource.baigeImg}
                    onClick={() => setSelecteSkin("薄茶色")}
                    checkValue={"薄茶色"}
                  />
                  <ImageAndTextBox
                    targetValue={selecteSkin}
                    text={"色黒"}
                    img={SkinResource.darkImg}
                    onClick={() => setSelecteSkin("色黒")}
                    checkValue={"色黒"}
                  />
                </Flex>
              </Box>
              <Box>
                <Text>脱毛をする箇所の毛量を選択してください</Text>
                <Text>
                  ここに説明を入れる。それぞれ選択する人はどんな特徴があるのか
                </Text>
                <Flex mt="1em" justifyContent={"center"} wrap={"wrap"}>
                  <ImageAndTextBox
                    targetValue={selecteHair}
                    text={"細い（産毛）"}
                    img={HairResource.softHair}
                    onClick={() => setSelecteHair("産毛")}
                    checkValue={"産毛"}
                  />
                  <ImageAndTextBox
                    targetValue={selecteHair}
                    text={"標準"}
                    img={HairResource.standardHair}
                    onClick={() => setSelecteHair("標準")}
                    checkValue={"標準"}
                  />
                  <ImageAndTextBox
                    targetValue={selecteHair}
                    text={"太い"}
                    img={HairResource.hardHair}
                    onClick={() => setSelecteHair("太い")}
                    checkValue={"太い"}
                  />
                </Flex>
              </Box>
              <Box>
                <Text>どちらの料金を重視するか選択してください</Text>
                <Text>
                  ここに説明を入れる。それぞれ選択する人はどんな特徴があるのか
                </Text>
                <Flex mt="1em" justifyContent={"center"} wrap={"wrap"}>
                  <HStack
                    w="9em"
                    h={"7em"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    shadow={selectePay === "総額" ? "0 0 3px 2px #888" : "md"}
                    cursor="pointer"
                    py="0.5rem"
                    m={{ md: "2rem", sm: "1rem" }}
                    onClick={() => setSelectePay("総額")}
                  >
                    <Text fontSize={"1.5em"} fontWeight="bold">
                      総額
                    </Text>
                    <Text>を重視</Text>
                  </HStack>
                  <HStack
                    w="9em"
                    h={"7em"}
                    shadow={selectePay === "１回分" ? "0 0 3px 2px #888" : "md"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    cursor="pointer"
                    py="0.5rem"
                    m={{ md: "2rem", sm: "1rem" }}
                    onClick={() => setSelectePay("１回分")}
                  >
                    <Text fontSize={"1.5em"} fontWeight="bold">
                      １回分
                    </Text>
                    <Text>を重視</Text>
                  </HStack>
                </Flex>
              </Box>
            </Stack>
          </Box>
          <HStack spacing={"2em"} justifyContent={"center"}>
            <Button onClick={router.back} variant={"base"}>
              戻る
            </Button>
            <Button onClick={createQuery} variant={"base"}>
              次へ
            </Button>
          </HStack>
        </Box>
        {/* <Adsense /> */}
      </OrderSalonPage>
    </>
  );
};
export default SearchSalon;
