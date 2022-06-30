import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  title: string;
  fontSize: string | { md: string; sm: string };
  as?: "h1" | "h2" | "h3";
};
export const UnderLineText: FC<Props> = (props) => {
  const { title, fontSize, as } = props;

  return (
    <Box>
      <Box display={"inline-block"} ml={"3.2vw"} textAlign="left">
        <Text as={as} fontSize={fontSize} display={"block"}>
          {title}
        </Text>
        {/* <Box w={"100%"} borderTop={"4px"} borderColor={"#000"}></Box> */}
      </Box>
      <Box borderBottom={"1px"}></Box>
    </Box>
  );
};
