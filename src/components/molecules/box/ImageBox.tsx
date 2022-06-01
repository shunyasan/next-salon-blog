import { Box, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState, VFC } from "react";
import { HomeFeatureText } from "types/app/HomeFeatureText";

type Props = {
  homeFeature: HomeFeatureText;
  width: { md: string; sm: string };
  height: { md: string; sm: string };
  // textHeight: string;
};
export const ImageBox: FC<Props> = (props) => {
  const { homeFeature, width, height } = props;
  const router = useRouter();

  const pushLink = () => {
    router.push(homeFeature.path);
  };

  return (
    <Box w={width} pt="2rem" px={"1rem"}>
      <Box
        shadow={"0 4px 8px 2px rgb(180,180,180)"}
        transitionDuration={"1s"}
        transitionTimingFunction={"ease-out"}
        cursor={"pointer"}
        _hover={{ shadow: "none" }}
        onClick={pushLink}
      >
        <Image src={homeFeature.img} alt="イメージ画像" />
        <Stack justifyContent={"center"} p={"0.9rem"} spacing={"0"}>
          <Flex
            fontWeight={"bold"}
            h={"2.6rem"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {homeFeature.text}
          </Flex>
          <Box borderBottom={"1px"} borderColor={"#bbb"}></Box>
          <Text fontSize={"0.7em"} h={height} textAlign={"left"}>
            {homeFeature.description}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};
