import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { PlanTextBox } from "components/atoms/text/PlanText";
import OrderSalonPage from "components/templete/pages/plan/OrderSalonPage";
import { OrderPlanEnum } from "enums/OrderPlanEnum";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  createQueryString,
  getQueryOrderPlan,
} from "services/app/parameter/CreateParameterHooks";
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

  const [change, setChange] = useState<string>(style.fade);
  const [selecteCard, setSelecteCard] = useState<string>("none");
  const [selecteLoan, setSelecteLoan] = useState<string>("none");
  const [selecteContract, setSelecteContract] = useState<string>("none");
  const [selecteFreeOption, setSelecteFreeOption] = useState<string[]>([]);

  const datas = [
    {
      target: selecteLoan,
      value: "希望なし",
      id: "none",
    },
    {
      target: selecteLoan,
      value: "希望なし",
      id: "none",
    },
    {
      target: selecteLoan,
      value: "希望なし",
      id: "none",
    },
  ];

  const createQuery = () => {
    const card = `${OrderPlanEnum.card.query}=${selecteCard}&`;
    const loan = `${OrderPlanEnum.loan.query}=${selecteLoan}&`;
    const contract = `${OrderPlanEnum.contract.query}=${selecteContract}&`;
    const option = `${OrderPlanEnum.option.query}=${selecteFreeOption}&`;
    const query = card + loan + option + contract;
    FindPlanLastCondition(query);
  };
  // // 最後の条件ボタン
  const FindPlanLastCondition = (query: string) => {
    const queryString = createQueryString(router.query);
    const decode = decodeURI(queryString);
    router.push({
      pathname: "/plan/search/1",
      search: decode + query,
    });
  };

  if (!queryOrderPlan) return <LoadingIcon />;
  return (
    <>
      <Head>
        <title>条件を選択 | 脱毛コンサルタント</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめのプランを検索します。安い/痛くないと言った要望や、顔/全身/VIOの中でも、クリニックにごとの施術範囲の違いを指定して検索できます。"
        />
      </Head>
      <OrderSalonPage showPage={3}>
        <Box className={change ? change : ""}>
          <Box m={6} textAlign="center">
            <Text>
              希望するオプションサービス・契約の特徴について教えてください
            </Text>
            <Stack spacing={"2rem"} mt={"2rem"}>
              {/* <Text>無料オプションサービスを選択してください</Text>
                <Box>
                  <Flex
                    wrap={"wrap"}
                    justifyContent={"space-between"}
                    w={"30rem"}
                    mx={"auto"}
                  >
                    <FreeOptionCheckBox
                      onChange={(values) => setSelecteFreeOption(values)}
                    />
                  </Flex>
                </Box> */}
              <Box>
                <Box>カード利用の可否を選択してください</Box>
                <Flex mt="1em" justifyContent={"center"} wrap={"wrap"}>
                  <PlanTextBox
                    targetValue={selecteCard}
                    value={"希望なし"}
                    id={"none"}
                    onClick={() => setSelecteCard("none")}
                  />
                  <PlanTextBox
                    targetValue={selecteCard}
                    value={"カード可"}
                    id={"OK"}
                    onClick={() => setSelecteCard("OK")}
                  />
                </Flex>
              </Box>
              <Box>
                <Box>医療ローンの可否を選択してください</Box>
                <Flex mt="1em" justifyContent={"center"} wrap={"wrap"}>
                  <PlanTextBox
                    targetValue={selecteLoan}
                    value={"希望なし"}
                    id={"none"}
                    onClick={() => setSelecteLoan("none")}
                  />
                  <PlanTextBox
                    targetValue={selecteLoan}
                    value={"医療ローン可"}
                    id={"OK"}
                    onClick={() => setSelecteLoan("OK")}
                  />
                </Flex>
              </Box>
              <Box>
                <Box>解約の可否を選択してください</Box>
                <Flex mt="1em" justifyContent={"center"} wrap={"wrap"}>
                  <PlanTextBox
                    targetValue={selecteContract}
                    value={"希望なし"}
                    id={"none"}
                    onClick={() => setSelecteContract("none")}
                  />
                  <PlanTextBox
                    targetValue={selecteContract}
                    value={"解約可"}
                    id={"OK"}
                    onClick={() => setSelecteContract("OK")}
                  />
                </Flex>
              </Box>
            </Stack>
          </Box>
          <HStack spacing={"2em"} justifyContent={"center"}>
            <Button onClick={router.back} variant={"base"}>
              戻る
            </Button>
            <Button onClick={createQuery} variant={"base"}>
              検索
            </Button>
          </HStack>
        </Box>
        {/* <Adsense /> */}
      </OrderSalonPage>
    </>
  );
};
export default SearchSalon;
