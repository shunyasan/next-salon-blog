import { Box, Flex, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { OriginCategoryBox } from "components/organisms/box/OriginCategoryBox";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, ReactNode, useCallback, useState } from "react";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import { PartsBox } from "components/organisms/box/PartsBox";
import {
  AboutCategory,
  BaseParts,
  BasicCategory,
  OriginCategory,
} from "@prisma/client";
import { CategoryBox } from "components/organisms/box/CategoryBox";
import { OrderPlanQueryService } from "services/orderPlanQueryService";
import { defaultData } from "services/common/defaultData";
import { LoadingModalIcon } from "components/atoms/icons/LoadingModalIcon";
import { Gender } from "types/Gender";
import fetcher from "services/common/fetcher";
import useSWR from "swr";
import { IdAndNameDto } from "types/IdAndNameDto";

type Props = {
  // title: string;
  selectedOriginId: string;
  children: ReactNode;
  // origin?: IdAndNameDto[];
  about: (AboutCategory & {
    basicCategory: BasicCategory[];
  })[];
  gender: Gender;

  // parts: BaseParts[];
};

const { createParameter } = OrderPlanQueryService();
const { defaultOrderPlanIdName } = defaultData();

const TreatmentTemplete: FC<Props> = ({
  // title,
  about,
  selectedOriginId,
  children,
  gender,
}) => {
  const router = useRouter();
  const [partsId, setPartsId] = useState<string>("B000001");
  const [aboutArray, setAboutArray] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const [originId, setOriginId] = useState<string>(selectOriginId);
  // const [gender, setGender] = useState<string>("女性");

  const searchForPlanFunc = (
    gender: Gender,
    originId: string,
    aboutCategoryId: string,
    partsId: string
  ) => {
    const defaultOrderData = defaultOrderPlanIdName;
    defaultOrderData.gender.id = gender;
    defaultOrderData.originParts.id = originId;
    defaultOrderData.aboutCategory.id = aboutCategoryId;
    defaultOrderData.parts.id = partsId;

    const query = createParameter(defaultOrderData);
    // const query = searchForPlan(gender, originId, aboutCategoryId, partsId);
    router.push({
      pathname: `/${gender}/plan/search/1`,
      query: query,
    });
  };

  const onClickParts = useCallback(
    (id: string) => {
      setPartsId(id);
      onOpen();
    },
    [onOpen]
  );

  const { data: origin, error: err_abo } = useSWR<OriginCategory[]>(
    `/api/origin-category`,
    fetcher
  );

  // const { data: viewAboutCategory, error: err_abo } = useSWR<AboutCategory[]>(
  //   `/api/about-categories/originId/${originId}`,
  //   async (url) => {
  //     const data: AboutCategory[] = await fetcher(url);
  //     setAboutArray(data[0].id);
  //     return data;
  //   },
  //   { fallbackData: about }
  // );

  if (!origin) return <LoadingModalIcon />;
  return (
    <Box>
      <LoadingModalIcon />
      {children}
      <Box textAlign={"center"}>
        <Flex
          mt="2rem"
          mx={"auto"}
          wrap={"wrap"}
          w={{ md: "70%", sm: "95%" }}
          justifyContent={"center"}
        >
          {origin.map((data, int) => (
            <OriginCategoryBox
              key={int}
              name={data.name}
              onClick={() =>
                router.push(`/${gender}/treatment-parts/${data.path}`)
              }
              arrow={selectedOriginId === data.id}
              fontSize={"1.2rem"}
              width={{ md: "16.6%", sm: "33.3%" }}
            />
          ))}
        </Flex>
        <Flex
          w={{ md: "80%", sm: "100%" }}
          mx="auto"
          mt="2rem"
          wrap={"wrap"}
          justifyContent={"space-evenly"}
        >
          {about.map((abo, i) => (
            <CategoryBox
              key={i}
              category={abo}
              gender={gender}
              width={{ md: "10rem", sm: "7.5rem" }}
              arrow={aboutArray === i}
              onClick={() => setAboutArray(i)}
            />
          ))}
        </Flex>
        <Flex
          maxW={{ md: "80%", sm: "95%" }}
          mx="auto"
          mt="2rem"
          wrap={"wrap"}
          justifyContent={"center"}
        >
          {about.map((abo, i) => (
            <Flex
              w="100% "
              key={i}
              pl={{ md: "4vw", sm: "4vw" }}
              textAlign="left"
              wrap={"wrap"}
              display={aboutArray === i ? "flex" : "none"}
            >
              {abo.basicCategory.map((parts, i) => (
                // ここをクリックでmodal？いや、下に表示させたほうがスクロールできて見栄えがいい？
                // 含む系の表記は無しにして、modal時に含む系の情報を載せる
                // そこからプランを探すに遷移
                // 画像も用意？
                <PartsBox
                  key={i}
                  parts={parts}
                  width={{ md: "33.3%", sm: "50%" }}
                  onOpen={() => onClickParts(parts.id)}
                  search={() =>
                    searchForPlanFunc(
                      gender,
                      about[0].originId,
                      parts.aboutCategoryId,
                      parts.id
                    )
                  }
                />
              ))}
            </Flex>
          ))}
          {/* <TreatmentPartsModal
            partsId={partsId}
            isOpen={isOpen}
            onClose={onClose}
          /> */}
        </Flex>
      </Box>
    </Box>
    //  <Adsense />
  );
};
export default TreatmentTemplete;
