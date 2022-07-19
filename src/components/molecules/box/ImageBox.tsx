import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useState, VFC } from "react";
import { HomeFeatureText } from "types/HomeFeatureText";

type Props = {
  homeFeature: HomeFeatureText;
  width: { md: string; sm: string };
  height?: { md: string; sm: string };
  // textHeight: string;
};
export const ImageBox: FC<Props> = (props) => {
  const { homeFeature, width, height } = props;
  const router = useRouter();

  const pushLink = () => {
    router.push(homeFeature.path);
  };

  return (
    <Box
      w={width}
      mt="2rem"
      mx={"1vw"}
      shadow={"0 4px 8px 2px rgb(180,180,180)"}
      transitionDuration={"1s"}
      transitionTimingFunction={"ease-out"}
      cursor={"pointer"}
      _hover={{ shadow: "none" }}
      onClick={pushLink}
    >
      <Box w={width} h={{ md: "11em", sm: "6em" }}>
        <Image
          layout="responsive"
          objectFit={"cover"}
          src={homeFeature.img}
          alt="イメージ画像"
          width="100%"
          height="80%"
          // h="14vw"
        />
      </Box>

      <Stack
        justifyContent={"center"}
        p={{ md: "0.9em", sm: ".5em" }}
        spacing={{ md: "0.9em", sm: ".5em" }}
      >
        <Flex
          fontWeight={{ md: "bold", sm: "normal" }}
          // h={{ md: "2.6rem", sm: "1.7rem" }}
          alignItems={"center"}
          justifyContent={"center"}
          fontSize={{ md: "1em", sm: ".8em" }}
        >
          {homeFeature.text}
        </Flex>
        <Box
          display={{ md: "block", sm: "none" }}
          borderBottom={"1px"}
          borderColor={"#bbb"}
        ></Box>
        <Text
          display={{ md: "inline-block", sm: "none" }}
          fontSize={"0.7em"}
          h={height}
          textAlign={"left"}
        >
          {homeFeature.description}
        </Text>
      </Stack>
    </Box>
  );
};
