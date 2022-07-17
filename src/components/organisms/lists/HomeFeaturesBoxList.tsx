import { Box, Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { VFC } from "react";
import { HomeFeatureText } from "types/HomeFeatureText";
import { FeatureResource } from "../../../../resorces/FeatureResource";
import { TopResource } from "../../../../resorces/TopResource";
import { ImageBox } from "../box/ImageBox";
export const HomeFeaturesBoxList: VFC = () => {
  const interior: HomeFeatureText = {
    img: FeatureResource.interiaGrateImg,
    text: "内装が豪華なクリニック",
    description: "施術による不安や緊張を緩和できるほど、豪華な内装のクリニック",
    path: "/feature/interior",
  };
  const visitFee: HomeFeatureText = {
    img: TopResource.clinicImg,
    text: "初診・再診料無料のクリニック",
    description: "施術以外の費用がなく、安心料金のクリニック",
    path: "/feature/visitFee",
  };
  const installments: HomeFeatureText = {
    img: FeatureResource.installmentsImg,
    text: "分割払い可能なクリニック",
    description:
      "一括による出費を抑えることができるため、選択可能なプランの多いクリニック",
    path: "/feature/installments",
  };
  const privateRoom: HomeFeatureText = {
    img: FeatureResource.privateRoomImg,
    text: "完全個室のクリニック",
    description:
      "完全なプライベート空間で、一段と落ち着いた施術を受けることができるクリニック",
    path: "/feature/privateRoom",
  };
  const anesthesia: HomeFeatureText = {
    img: FeatureResource.anesthesiaImg,
    text: "麻酔無料のクリニック",
    description: "痛みが心配な人でも、費用を気にせず施術できるクリニック",
    path: "/feature/anesthesia",
  };
  const sutudentDiscount: HomeFeatureText = {
    img: FeatureResource.studentImg,
    text: "学生料金（学割）のあるクリニック",
    description: "学生に対してお得に施術を提供しているクリニック",
    path: "/feature/sutudentDiscount",
  };

  const datas: HomeFeatureText[] = [
    interior,
    visitFee,
    installments,
    privateRoom,
    anesthesia,
    sutudentDiscount,
  ];

  return (
    <Flex wrap={"wrap"} justifyContent={"center"}>
      {datas.map((data, i) => (
        <ImageBox
          homeFeature={data}
          key={i}
          width={{ md: "18rem", sm: "17rem" }}
          height={{ md: "2rem", sm: "inherit" }}
        />
      ))}
    </Flex>
  );
};
