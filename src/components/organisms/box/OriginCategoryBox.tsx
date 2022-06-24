import { Box, Image, Text } from "@chakra-ui/react";
import { FC, memo, useCallback, useState, VFC } from "react";

type Props = {
  name: string;
  onClick: () => void;
  arrow: boolean;
  fontSize: string;
  width: { md: string; sm: string };
};
export const OriginCategoryBox: FC<Props> = (props) => {
  const { name, onClick, arrow, fontSize, width } = props;

  return (
    // <Box>
    // <Box
    //   cursor={"pointer"}
    //   m={"0.5em !important"}
    //   w="5rem"
    //   textAlign={"center"}
    //   border={"2px"}
    //   py={"0.5rem"}
    //   fontSize={fontSize}
    //   bg={arrow ? "originBlack" : ""}
    //   color={arrow ? "originWhite" : ""}
    //   onClick={onClick}
    //   transition={"0.2s"}
    //   transitionTimingFunction={"linear"}
    // >
    //   {name}
    // </Box>
    // {arrow && <Box mt={"5px"}>▼</Box>}
    // </Box>

    <Box
      width={width}
      py={"1em"}
      color={arrow ? "originBlack" : ""}
      fontWeight={arrow ? "bold" : ""}
      borderBottom={arrow ? "2px" : ""}
      borderColor={arrow ? "originBlack" : ""}
      transition={"0.5s"}
      cursor={"pointer"}
      _hover={{
        bg: arrow ? "" : "#aaa",
        transition: "0.5s",
      }}
      textAlign={"center"}
      onClick={onClick}
    >
      <Box display={"inline-block"}>{name}</Box>
    </Box>
  );
};
