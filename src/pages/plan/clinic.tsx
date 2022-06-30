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
import { ImageAndTextBox } from "components/molecules/box/ImageAndTextBox";
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
import { ClinicResource } from "../../../resorces/ClinicResource";
import { TopResource } from "../../../resorces/TopResource";
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
  const [selecteRoomType, setSelecteRoomType] = useState<string>("none");
  const [selecteInterior, setSelecteInterior] = useState<string>("綺麗");
  const [selecteStaff, setSelecteStaff] = useState<number>(0);

  const createQuery = () => {
    const room = `${OrderPlanEnum.roomType.query}=${selecteRoomType}&`;
    const interior = `${OrderPlanEnum.interior.query}=${selecteInterior}&`;
    const staff = `${OrderPlanEnum.staff.query}=${selecteStaff}&`;
    selectParamsData(room + interior + staff);
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
      pathname: "/plan/plan",
      search: encode,
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
      <OrderSalonPage showPage={2}>
        <Box m={6} textAlign="center" className={change ? change : ""}>
          <Text>希望するクリニックの特徴について教えてください</Text>
          <Stack spacing={"2rem"} mt={"2rem"}>
            <Box>
              <Text>施術室のタイプを選択してください</Text>
              <Flex mt="1em" wrap={"wrap"} justifyContent={"center"}>
                <PlanTextBox
                  targetValue={selecteRoomType}
                  id={"none"}
                  value={"希望なし"}
                  onClick={() => setSelecteRoomType("none")}
                />
                <PlanTextBox
                  targetValue={selecteRoomType}
                  id={"個室"}
                  value={"個室"}
                  onClick={() => setSelecteRoomType("個室")}
                />
                <PlanTextBox
                  targetValue={selecteRoomType}
                  id={"完全個室"}
                  value={"完全個室"}
                  onClick={() => setSelecteRoomType("完全個室")}
                />
              </Flex>
            </Box>
            <Box>
              <Box>内装イメージを選択してください</Box>
              <Flex mt="1em" justifyContent={"center"} wrap={"wrap"}>
                <PlanTextBox
                  targetValue={selecteInterior}
                  id={"none"}
                  value={"希望なし"}
                  onClick={() => setSelecteInterior("none")}
                />
                <ImageAndTextBox
                  targetValue={selecteInterior}
                  text={"標準"}
                  img={ClinicResource.nomalClinic}
                  onClick={() => setSelecteInterior("標準")}
                  checkValue={"標準"}
                />
                <ImageAndTextBox
                  targetValue={selecteInterior}
                  text={"綺麗"}
                  img={TopResource.clinicImg}
                  onClick={() => setSelecteInterior("綺麗")}
                  checkValue={"綺麗"}
                />
                <ImageAndTextBox
                  targetValue={selecteInterior}
                  text={"豪華"}
                  img={ClinicResource.luxuryClinic}
                  onClick={() => setSelecteInterior("豪華")}
                  checkValue={"豪華"}
                />
              </Flex>
            </Box>
            <Box>
              <Box>施術者の性別を選択してください</Box>
              {/*  省くNo.を入力 (DB 1:女性 2:男性 3:女性男性) */}
              <Flex mt="1em" justifyContent={"center"} wrap={"wrap"}>
                <PlanTextBox
                  targetValue={selecteStaff}
                  id={0}
                  value={"希望なし"}
                  onClick={() => setSelecteStaff(0)}
                />
                <PlanTextBox
                  targetValue={selecteStaff}
                  id={2}
                  value={"女性"}
                  onClick={() => setSelecteStaff(2)}
                />
                <PlanTextBox
                  targetValue={selecteStaff}
                  id={1}
                  value={"男性"}
                  onClick={() => setSelecteStaff(1)}
                />
              </Flex>
            </Box>
          </Stack>
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
