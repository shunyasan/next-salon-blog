import { Box, Center, Flex, HStack, Text } from "@chakra-ui/layout";
import { AboutCategory, BaseParts, OriginCategory } from "@prisma/client";
import { PartsButton } from "components/atoms/button/PartsButton";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { GenderPlateBox } from "components/molecules/box/GenderPlateBox";
import { CategoryBox } from "components/organisms/box/CategoryBox";
import { OriginCategoryBox } from "components/organisms/box/OriginCategoryBox";
import { PartsBox } from "components/organisms/box/PartsBox";
import TreatmentPartsBox from "components/organisms/box/TreatmentPartsBox";
import OrderSalonPage from "components/templete/pages/plan/OrderSalonPage";
import { OrderPlanEnum } from "enums/OrderPlanEnum";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  createQueryString,
  getQueryOrderPlan,
} from "services/app/parameter/CreateParameterHooks";
import fetcher from "services/fetcher";
import {
  aboutCategoryService,
  basePartsService,
  originCategoryService,
} from "services/service";
import useSWR from "swr";

import { QueryOrderPlan } from "types/app/QueryOrderPlan";
import { IdAndNameDto } from "types/IdAndNameDto";
import style from "../../../styles/Home.module.css";

type Props = {
  queryOrderPlan: QueryOrderPlan;
  originCategories: OriginCategory[];
  aboutCategoryData: AboutCategory[];
  basePartsData: BaseParts[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const query = createQueryString(context.query);
  const queryOrderPlan = getQueryOrderPlan(query);
  const originCategories = await originCategoryService.getAllOriginCategory();
  const aboutCategoryData =
    await aboutCategoryService.getAboutCategoryByOriginId(
      originCategoryService.mockOrigin[0].id
    );
  const basePartsData = await basePartsService.getAllBasePartsByAboutId(
    aboutCategoryData[0].id
  );
  return {
    props: {
      queryOrderPlan: queryOrderPlan,
      originCategories,
      aboutCategoryData,
      basePartsData,
    },
  };
};

const SearchSalon: NextPage<Props> = (props) => {
  const { queryOrderPlan, aboutCategoryData, basePartsData, originCategories } =
    props;
  const router = useRouter();

  const [change, setChange] = useState<string>(style.fade);
  const [gender, setGender] = useState<string>("女性");
  //配列番号を所持
  const [originId, setOriginId] = useState<string>(originCategories[0].id);
  const [aboutId, setAboutId] = useState<string>(aboutCategoryData[0].id);

  const { data: aboutCategories, error: err_abo } = useSWR<AboutCategory[]>(
    `/api/about-categories/originId/${originId}`,
    fetcher,
    {
      fallbackData: aboutCategoryData,
    }
  );

  // パラメータ直す
  const { data: baseParts, error: err_parts } = useSWR<BaseParts[]>(
    `/api/base-parts/${aboutId}?gender=${gender}`,
    fetcher,
    {
      fallbackData: basePartsData,
    }
  );

  const onClickParts = (partsId: string) => {
    const me = `${OrderPlanEnum.gender.query}=${gender}&`;
    const origin = `${OrderPlanEnum.originCategory.query}=${originId}&`;
    const about = `${OrderPlanEnum.aboutCategory.query}=${aboutId}&`;
    const parts = `${OrderPlanEnum.parts.query}=${partsId}&`;
    const query = me + origin + about + parts;
    selectParamsData(query);
  };

  // 次ボタン　パラメーター
  const selectParamsData = (query: string) => {
    // createPageQuery(query, page);
    // setPrevParamsData(decode);
    setChange(style.slide);
    const queryString = createQueryString(router.query);
    const decode = decodeURI(queryString);
    const createParams = `${decode}${query}`;
    const encode = encodeURI(createParams);
    // setShowPage(page || 0);

    router.push({
      pathname: "/plan/self",
      search: encode,
    });
  };

  useEffect(() => {
    aboutCategories && setAboutId(aboutCategories[0].id);
  }, [aboutCategories]);

  if (!aboutCategories || !baseParts) return <LoadingIcon />;
  return (
    <>
      <Head>
        <title>条件を選択 | あなたのための脱毛</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」からおすすめのプランを検索します。安い/痛くないと言った要望や、顔/全身/VIOの中でも、クリニックにごとの施術範囲の違いを指定して検索できます。"
        />
      </Head>
      <OrderSalonPage showPage={0}>
        {/* <TreatmentPartsModal
          originCategories={originCategories}
          aboutCategoryData={aboutCategoryData}
          basePartsData={basePartsData}
        /> */}
        <Box m={6} textAlign="center" className={change ? change : ""}>
          <Text mb="2em">希望する部位を選択してください</Text>
          <Box>
            <GenderPlateBox
              gender={gender}
              onClick={(gender: string) => setGender(gender)}
            />
          </Box>
          <Flex
            mt="2rem"
            mx={"auto"}
            wrap={"wrap"}
            w={{ md: "70%", sm: "95%" }}
            justifyContent={"center"}
          >
            {originCategories.map((data, int) => (
              <OriginCategoryBox
                key={int}
                name={data.name}
                onClick={() => setOriginId(data.id)}
                arrow={originId === data.id}
                fontSize={"1.2rem"}
                width={{ md: "16.6%", sm: "33.3%" }}
              />
            ))}
          </Flex>
          <Flex
            w={"80%"}
            mx="auto"
            mt="2rem"
            wrap={"wrap"}
            justifyContent={"space-evenly"}
          >
            {aboutCategories.map((abo, i) => (
              <CategoryBox
                key={i}
                category={abo}
                gender={gender}
                width={{ md: "10rem", sm: "7.5rem" }}
                arrow={abo.id === aboutId}
                onClick={() => setAboutId(abo.id)}
              />
            ))}
          </Flex>
          <Flex
            w={{ md: "50%", sm: "90%" }}
            mx="auto"
            textAlign="center"
            // mt="1rem"
            wrap={"wrap"}
            justifyContent={"left"}
            // visibility={aboutArray === i ? "visible" : "hidden"}
          >
            {baseParts.map((parts, i) => (
              <Flex key={i}>
                <PartsButton
                  text={parts.name}
                  onClick={() => onClickParts(parts.id)}
                />
              </Flex>
            ))}
          </Flex>
        </Box>
      </OrderSalonPage>

      {/* <Adsense /> */}
    </>
  );
};
export default SearchSalon;
