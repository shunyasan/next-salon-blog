import { Box, Flex, Text } from "@chakra-ui/react";
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
      <Flex>
        <Text>脱毛コンサルタント</Text>
      </Flex>
      <Text fontSize="0.35em">東京都</Text>
    </Box>
  );
};
