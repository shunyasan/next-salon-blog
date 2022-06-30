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

export const PairDataRowBoxList_2: FC<Props> = (props) => {
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
            fontSize={{ md: ".8em", sm: ".7em" }}
            w="40%"
            fontWeight={fontWeight ? "bold" : ""}
          >
            {data.title}
          </Text>
          <Box w="60%" textAlign={"left"} fontSize={{ md: "1em", sm: ".9em" }}>
            <StatusText
              text={data.value}
              first={""}
              second={"無料"}
              other={"-"}
            />
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};
