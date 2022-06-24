import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  title: string;
  fontSize: { md: string; sm: string };
  as?: "h1" | "h2" | "h3";
};
export const UnderLineText: FC<Props> = (props) => {
  const { title, fontSize, as } = props;

  return (
    <Box>
      <Box borderBottom={"1px"}></Box>
      <Box display={"inline-block"} ml={"3rem"}>
        <Box w={"100%"} borderTop={"4px"} borderColor={"#000"}></Box>
        <Text as={as} fontSize={fontSize} display={"inline-block"}>
          {title}
        </Text>
      </Box>
    </Box>
  );
};
