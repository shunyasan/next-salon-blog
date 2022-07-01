import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { StatusText } from "components/atoms/text/StatusText";
import { FC, memo, useCallback, VFC } from "react";
import { TitleValue } from "types/app/TitleValue";
type Props = {
  datas: TitleValue[];
  // width: string | { md: string; sm: string };
  fontSize?: string;
  bg?: string;
  my?: { md: string; sm: string };
  fontWeight?: boolean;
  justifyContent?: string;
};

// FreeServiceBoxListと似ているのでどちらか削除

export const PairDataRowBoxList: FC<Props> = (props) => {
  const { datas, bg, fontSize, my, fontWeight, justifyContent } = props;

  return (
    <Flex
      bg={bg || ""}
      w={"100%"}
      wrap={"wrap"}
      justifyContent={justifyContent || ""}
    >
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
              md: data.value && data.value !== "-" ? ".9em" : ".8em",
              sm: data.value && data.value !== "-" ? ".9em" : ".8em",
            }}
            w="40%"
            fontWeight={data.value && data.value !== "-" ? "bold" : ""}
          >
            {data.title}
          </Text>
          <Box w="60%" textAlign={"left"} fontSize={{ md: "1em", sm: ".9em" }}>
            <StatusText
              text={data.value}
              first={"無料"}
              second={data.value === "-" ? "" : data.value}
              other={"-"}
            />
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};
