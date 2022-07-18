import { Box, Image, Text } from "@chakra-ui/react";
import { Picture } from "@prisma/client";
import { FC, memo, VFC } from "react";

type Props = {
  src: string;
  fontSize: string | { md: string; sm: string };
  picture?: Picture;
  height: string | { md: string; sm: string };
  width: string | { md: string; sm: string };

  // onClick: () => void;
};

export const CopyrightImageBox: FC<Props> = (props) => {
  const { picture, fontSize, src, height, width } = props;

  return (
    <Box
      height={height}
      width={width}
      pos={"relative"}
      flexShrink={"0"}
      zIndex={1}
    >
      <Image
        src={picture?.url || src}
        height={height}
        width={width}
        objectFit={"contain"}
        alt="イメージ画像"
      />
      <Box
        pos={"absolute"}
        left={"0px"}
        bottom={"0px"}
        color={"#fff"}
        textAlign={"left"}
        px={"3px"}
        bg={"rgba(20,20,20,0.3)"}
        display={"inline-block"}
        fontSize={fontSize}
        // textShadow={"1px 1px 1px #000"}
        // bg={"#666"}
      >
        <Text fontSize={fontSize}>
          {picture ? "出典元：" + picture.authority : undefined}
        </Text>
        <Text fontSize={fontSize}>{picture?.authorityUrl}</Text>
      </Box>
    </Box>
  );
};
