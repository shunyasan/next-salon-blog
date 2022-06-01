import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { FC, memo, useCallback, VFC } from "react";
import { TitleValue } from "types/app/TitleValue";
type Props = {
  datas: TitleValue[];
  fontSize?: string;
  bg?: string;
  justifyContent?: string;
};

export const PairDataBoxList: FC<Props> = (props) => {
  const { datas, bg, fontSize, justifyContent } = props;

  return (
    <Stack bg={bg || ""} fontSize={fontSize}>
      {datas.map((data, i) => (
        <Flex
          key={i}
          my={"1em !important"}
          wrap={"wrap"}
          justifyContent={justifyContent || "space-between"}
        >
          <Text fontWeight={"bold"} w="20%">
            {data.title}
          </Text>
          <Text w="78%" textAlign={"left"}>
            {data.value}
          </Text>
        </Flex>
      ))}
    </Stack>
  );
};
