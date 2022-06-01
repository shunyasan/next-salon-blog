import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { FC, memo, useCallback, VFC } from "react";
import { TitleValue } from "types/app/TitleValue";
type Props = {
  datas: TitleValue[];
  width: string | { md: string; sm: string };
  fontSize?: string;
  bg?: string;
  my?: { md: string; sm: string };
  fontWeight?: boolean;
  justifyContent?: string;
};

export const PairDataRowBoxList: FC<Props> = (props) => {
  const { datas, bg, fontSize, width, my, fontWeight, justifyContent } = props;

  return (
    <Flex
      bg={bg || ""}
      wrap={"wrap"}
      w={"100%"}
      justifyContent={justifyContent || ""}
    >
      {datas.map((data, i) => (
        <Flex
          key={i}
          fontSize={fontSize}
          w={width}
          my={my || { md: "1em !important", sm: "0.5em !important" }}
          wrap={"wrap"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text
            fontSize={{ md: ".8em", sm: ".7em" }}
            w="40%"
            fontWeight={fontWeight ? "bold" : ""}
          >
            {data.title}
          </Text>
          <Text w="60%" textAlign={"left"} fontSize={{ md: "1em", sm: ".9em" }}>
            {data.value}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};
