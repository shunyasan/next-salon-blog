import { Box, Image, Text } from "@chakra-ui/react";
import { FC, memo, VFC } from "react";

type Props = {
  src: string;
  authority: string;
  fontSize: string;
  name?: string;
  // onClick: () => void;
};

export const CopyrightImageBox: FC<Props> = (props) => {
  const { src, authority, fontSize, name } = props;

  return (
    <Box pos={"relative"} height="auto">
      <Image src={src} height="auto" objectFit={"contain"} alt="イメージ画像" />
      <Box
        pos={"absolute"}
        left={"2px"}
        bottom={"1px"}
        color={"#fff"}
        // textShadow={"1px 1px 1px #000"}
      >
        <Text mb={"-5px"}>{name}</Text>
        <Text
          fontSize={fontSize}
          px={"3px"}
          color={"#fff"}
          // bg={"#666"}
          bg={"rgba(20,20,20,0.5)"}
          display={"inline-block"}
        >
          {/* 出典元: {authority} */}
        </Text>
      </Box>
    </Box>
  );
};
