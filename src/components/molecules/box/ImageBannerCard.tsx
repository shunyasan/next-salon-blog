import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  src: string;
  alt: string;
  url: string;
  title: string;
  margin: string | { md: string; sm: string };
};

export const ImageBannerCard: FC<Props> = ({
  src,
  alt,
  url,
  title,
  margin,
}) => {
  return (
    <Text
      as="a"
      href={url}
      cursor={"pointer"}
      _hover={{
        shadow: "lg",
        transition: "0.5s",
      }}
    >
      <Flex alignItems={"center"} m={margin}>
        <Box
          mx={"auto"}
          width={{ md: "30%", sm: "30%" }}
          height={{ md: "8vw", sm: "18vw" }}
          pos="relative"
        >
          <Image layout="fill" objectFit={"contain"} src={src} alt={alt} />
        </Box>
        <Text
          width={"70%"}
          display={"inline-block"}
          fontSize={"1em"}
          my={"1.5em"}
          pl={"2em"}
          color={"originGold"}
        >
          {title}
        </Text>
      </Flex>
    </Text>
  );
};
