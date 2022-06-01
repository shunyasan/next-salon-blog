import { Box, Center, Flex, Link, Text } from "@chakra-ui/react";
import { FC, memo, VFC } from "react";

type Props = {
  text: string;
  width: { md: string; sm: string };
  onClick?: () => void;
  padding?: string;
  margin?: string;
};
export const ChangeBgText: FC<Props> = (props) => {
  const { text, width, padding, margin, onClick } = props;
  return (
    <Text
      w={width}
      p={padding || "0.1rem 1.3rem"}
      m={margin || "0 0.5em"}
      cursor="pointer"
      _hover={{
        transition: "0.5s",
        backgroundColor: "rgba(220,220,220,0.2)",
      }}
      onClick={onClick}
    >
      {text}
    </Text>
  );
};
