import { Icon } from "@chakra-ui/icons";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
  fontSize: string | { md: string; sm: string };
  color: string;
  // fontSize: {md: string, sm: string}
};

export const Logo: FC<Props> = (props) => {
  const { fontSize, color } = props;
  return (
    <Box
      color={color}
      display={"inline-block"}
      my={4}
      fontFamily="'Zen Kaku Gothic New', sans-serif"
      fontWeight={"bold"}
      fontSize={fontSize}
      textAlign={"center"}
    >
      <Box>
        <Text>脱毛コンサルタント</Text>
        <Flex justifyContent={"center"}>
          <Image
            w="1.6em"
            objectFit={"contain"}
            src="/consaltant.png"
            alt="脱毛コンサルタント"
            mx="auto"
          />
        </Flex>
      </Box>
      {/* <Text fontSize="0.35em">東京都</Text> */}
    </Box>
  );
};
