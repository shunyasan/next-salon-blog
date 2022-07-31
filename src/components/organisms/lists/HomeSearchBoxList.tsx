import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { ImageBox } from "components/molecules/box/ImageBox";
import { useRouter } from "next/router";
import { FC } from "react";
import { Gender } from "types/Gender";
import { HomeFeatureText } from "types/HomeFeatureText";
import { TopResource } from "../../../../resorces/TopResource";

export const HomeSearchBoxList: FC = () => {
  const router = useRouter();
  const gender = (router.query.gender as Gender) || "lady";

  const plan: HomeFeatureText = {
    img: TopResource.planImg,
    text: "プランを探す",
    description:
      "自身の特徴や施術に求めることを選択し、あなたのための脱毛プランを検索します",
    path: `/${gender}/plan`,
  };
  // const clinic: HomeFeatureText = {
  //   img: planImg,
  //   text: "クリニックを探す",
  //   description: "クリニックから選ぶ検索方法だお",
  //   path: "",
  // };
  const partsList: HomeFeatureText = {
    img: TopResource.partsImg,
    text: "部位一覧",
    description:
      "各クリニックを分析して、全クリニック共通の表記にした施術可能な部位一覧",
    path: `/${gender}//treatment-parts`,
  };
  const clinicList: HomeFeatureText = {
    img: TopResource.clinicImg,
    text: "クリニック一覧",
    description: "東京都の中でも、激戦区である主要５区ほぼ全てのクリニック一覧",
    path: `/${gender}/clinic/1`,
  };
  const datas: HomeFeatureText[] = [plan, partsList, clinicList];

  return (
    <Flex
      // wrap={"wrap"}
      w={{ md: "90%", sm: "100%" }}
      m={"auto"}
      justifyContent={"space-evenly"}
    >
      {datas.map((data, i) => (
        <ImageBox
          img={data.img}
          text={data.text}
          description={data.description}
          path={data.path}
          width={{ md: "14em", sm: "30vw" }}
          // height={{ md: "2rem", sm: "inherit" }}
          key={i}
        />
      ))}
    </Flex>
  );
};
