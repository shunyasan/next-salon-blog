import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FC, memo, useEffect, useState, VFC } from "react";
import { TopResource } from "../../../../resorces/TopResource";

type Props = {
  title: string;
};
export const BgImgH1: FC<Props> = (props) => {
  const { title } = props;

  return (
    <Flex
      bgImage={TopResource.topImg}
      bgSize={"cover"}
      h={{ md: "14rem", sm: "9rem" }}
      // my={"3rem"}
      // mx={{ md: "3rem", sm: "1rem" }}
    >
      <Flex
        as="h1"
        justifyContent={"center"}
        alignItems={"center"}
        w="100%"
        h={{ md: "14rem", sm: "9rem" }}
        backdropFilter="auto"
        backdropBlur="5px"
        color={"originWhite"}
        fontSize={"1.6rem"}
        textShadow={"1px 1px 3px #000"}
      >
        {title}
      </Flex>
    </Flex>
  );
};
