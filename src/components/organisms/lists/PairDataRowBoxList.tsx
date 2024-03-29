import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { StatusText } from "components/atoms/text/StatusText";
import { FC, memo, useCallback, VFC } from "react";
import { TitleValue } from "types/TitleValue";
type Props = {
  datas: TitleValue[];
  // width: string | { md: string; sm: string };
  fontSize?: string;
  my?: { md: string; sm: string };
};

// FreeServiceBoxListと似ているのでどちらか削除

export const PairDataRowBoxList: FC<Props> = (props) => {
  const { datas, fontSize, my } = props;

  return (
    <Flex w={"100%"} wrap={"wrap"}>
      {datas.map((data, i) => (
        <Flex
          key={i}
          fontSize={fontSize}
          w={"50%"}
          my={my || { md: "1em", sm: "0.5em" }}
          wrap={"wrap"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text
            fontSize={{
              md: data.value && data.value !== "ー" ? ".9em" : ".8em",
              sm: data.value && data.value !== "ー" ? ".9em" : ".8em",
            }}
            w="50%"
            fontWeight={data.value && data.value !== "ー" ? "bold" : ""}
          >
            {data.title}
          </Text>
          <Box w="50%" textAlign={"left"} fontSize={{ md: "1em", sm: ".9em" }}>
            <StatusText
              text={data.value}
              first={"無料"}
              second={data.value === "ー" ? "" : data.value}
              other={"ー"}
            />
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};
