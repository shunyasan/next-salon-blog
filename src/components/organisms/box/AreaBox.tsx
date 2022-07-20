import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { FC, memo, VFC } from "react";

type Props = {
  area: string;
  description: string;
  arrow: boolean;
  onClick: () => void;
  fontSize: string;
  // getId: (id: string) => void;
  // 1:女性 2:男性
};
export const AreaBox: FC<Props> = (props) => {
  const { area, arrow, description, onClick, fontSize } = props;
  return (
    <Flex
      fontSize={fontSize || undefined}
      cursor={"pointer"}
      border={arrow ? "4px" : "1px"}
      w={"8rem"}
      h={"5rem"}
      m={"1rem"}
      alignItems={"center"}
      justifyContent={"center"}
      onClick={onClick}
      transition={"0.2s"}
      transitionTimingFunction={"linear"}
      // bg={arrow ? "originBlack" : ""}
      // color={arrow ? "originWhite" : ""}
    >
      <Text>{area}</Text>
      {/* <Box
        borderBottom={"1px"}
        borderColor={"black"}
        my={"0.5rem"}
        w={"80%"}
      ></Box>
      <Text fontSize={"0.6em"}>{description}</Text> */}
    </Flex>
    //  {arrow && <Box fontSize={"1.3rem"}>▼</Box>}
  );
};
