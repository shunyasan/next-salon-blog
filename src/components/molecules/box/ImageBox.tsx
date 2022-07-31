import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useState, VFC } from "react";
import { HomeFeatureText } from "types/HomeFeatureText";

type Props = {
  img: string;
  text: string;
  description?: string;
  path: string;
  width: string | { md: string; sm: string };
  height?: string | { md: string; sm: string };
  // textHeight: string;
};
export const ImageBox: FC<Props> = (props) => {
  const { img, text, description, path, width, height } = props;
  const router = useRouter();

  const pushLink = () => {
    router.push(path);
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
      <Box w={width}>
        <Image
          layout="responsive"
          objectFit={"cover"}
          src={img}
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
          {text}
        </Flex>
        {description && (
          <>
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
              {description}
            </Text>
          </>
        )}
      </Stack>
    </Box>
  );
};
