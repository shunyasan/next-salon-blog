import { FC, useEffect, useState, VFC } from "react";
import { IconButton, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { StatusText } from "../../atoms/text/StatusText";

type Props = {
  title: string;
  value: string;
  fontSize?: { true: string; false: string };
  height?: string;
  width?: string;
  changeVal?: string;
};

export const FreeServiceBox: FC<Props> = (props) => {
  const { title, value, fontSize, height, width, changeVal } = props;
  const [fontSizeData, setFontSizeData] = useState<string>();
  useEffect(() => {
    if (fontSize) {
      setFontSizeData(value !== "-" ? fontSize.true : fontSize.false);
    } else {
      setFontSizeData(value !== "-" ? "0.7em" : "0.6em");
    }
  }, [fontSize, value]);
  return (
    <Flex
      w={width || "5.5rem"}
      h={height || "4rem"}
      justifyContent={"center"}
      // spacing={"3px"}
      fontSize={{ md: fontSizeData, sm: value !== "-" ? "0.7em" : "0.5em" }}
      // onClick={onClick}
      // mx={"auto !important"}
      // cursor={"pointer"}
    >
      <Text fontWeight={value !== "-" ? "bold" : ""}>{title}</Text>
      {/* <Box
        borderBottom={"1px"}
        borderColor={"black"}
        w={"80%"}
        mx={"auto !important"}
      ></Box> */}
      <Box display={"inline-block"}>
        <StatusText
          text={value}
          first={""}
          second={changeVal || ""}
          other={"-"}
        />
      </Box>
    </Flex>
  );
};
