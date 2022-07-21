import { Box, Flex, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { OriginCategoryBox } from "components/organisms/box/OriginCategoryBox";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, ReactNode, useCallback, useState } from "react";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import { PartsBox } from "components/organisms/box/PartsBox";
import { AboutCategory, BaseParts, OriginCategory } from "@prisma/client";
import { CategoryBox } from "components/organisms/box/CategoryBox";
import { OrderPlanQueryService } from "services/orderPlanQueryService";
import { defaultData } from "services/common/defaultData";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";

type Props = {
  // title: string;
  selectedOriginId: string;
  children: ReactNode;
  // origin?: IdAndNameDto[];
  about: (AboutCategory & {
    baseParts: BaseParts[];
  })[];
  gender: string;
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

  // const origin = [
  //   { id: "Z000001", name: "顔", path: "" },
  //   { id: "Z000002", name: "四肢", path: "limb" },
  //   { id: "Z000003", name: "体幹", path: "body" },
  //   { id: "Z000004", name: "VIO", path: "vio" },
  //   { id: "Z000005", name: "全身", path: "all-body" },
  //   { id: "Z000006", name: "その他", path: "other" },
  // ];

  const searchForPlanFunc = (
    gender: string,
    originId: string,
    aboutCategoryId: string,
    partsId: string
  ) => {
    const defaultOrderData = defaultOrderPlanIdName;
    defaultOrderData.gender;
    defaultOrderData.originParts.id = originId;
    defaultOrderData.aboutCategory.id = aboutCategoryId;
    defaultOrderData.parts.id = partsId;

    const query = createParameter(defaultOrderData);
    // const query = searchForPlan(gender, originId, aboutCategoryId, partsId);
    router.push({
      pathname: "/plan/search/1",
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

  // これはどうにかする
  const mockOrigin = [
    { id: "Z000001", name: "顔", path: "" },
    { id: "Z000002", name: "四肢", path: "limb" },
    { id: "Z000003", name: "体幹", path: "body" },
    { id: "Z000004", name: "VIO", path: "vio" },
    { id: "Z000005", name: "全身", path: "all-body" },
    { id: "Z000006", name: "その他", path: "other" },
  ];

  // const defaultOrderPlanIdName = {
  //   gender: { id: "女性", name: "女性" },
  //   paySystem: { id: "総額", name: "総額" },
  //   originParts: { id: "Z000001", name: "顔" },
  //   aboutCategory: { id: "A000001", name: "顔（鼻から上）" },
  //   parts: { id: "B000005", name: "眉全体" },
  //   skinCollor: { id: "薄茶色", name: "平均的な肌色" },
  //   hair: { id: "標準", name: "どちらとも言えない毛" },
  //   roomType: { id: "none", name: "こだわらない" },
  //   interior: { id: "none", name: "こだわらない" },
  //   staff: { id: "none", name: "こだわらない" },
  //   card: { id: "none", name: "こだわらない" },
  //   loan: { id: "none", name: "こだわらない" },
  //   contract: { id: "none", name: "こだわらない" },
  //   option: { id: "none", name: "こだわらない" },
  //   sort: { id: "none", name: "こだわらない" },
  // };
  //   const changeGenderState = useCallback(
  //   (genderParam: string) => {
  //     if (gender !== genderParam) {
  //       setGender(genderParam);
  //     }
  //   },
  //   [gender]
  // );

  // const { data: viewAboutCategory, error: err_abo } = useSWR<AboutCategory[]>(
  //   `/api/about-categories/originId/${originId}`,
  //   async (url) => {
  //     const data: AboutCategory[] = await fetcher(url);
  //     setAboutArray(data[0].id);
  //     return data;
  //   },
  //   { fallbackData: about }
  // );

  // const { data: viewBaseParts, error: err_base } = useSWR<BaseParts[]>(
  //   `/api/base-parts/${aboutId}?gender=${gender}`,
  //   fetcher,
  //   { fallbackData: parts }
  // );

  // if (!origin || !viewAboutCategory || !viewBaseParts) return <LoadingIcon />;
  return (
    <Box>
      <LoadingIcon />
      {children}
      <Box textAlign={"center"}>
        <Flex
          mt="2rem"
          mx={"auto"}
          wrap={"wrap"}
          w={{ md: "70%", sm: "95%" }}
          justifyContent={"center"}
        >
          {mockOrigin.map((data, int) => (
            <OriginCategoryBox
              key={int}
              name={data.name}
              onClick={() => router.push(`/treatment-parts/${data.path}`)}
              arrow={selectedOriginId === data.id}
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
              {abo.baseParts.map((parts, i) => (
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
