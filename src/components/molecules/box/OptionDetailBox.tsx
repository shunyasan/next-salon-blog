import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Option, OptionKind } from "@prisma/client";
import { StatusText } from "components/atoms/text/StatusText";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import { titleValueService } from "services/titleValueService";
import { TitleValue } from "types/TitleValue";
type Props = {
  options: Option[];
  title: string;
  kind: OptionKind;
  fontSize?: string;
  my?: { md: string; sm: string };
};

// FreeServiceBoxListと似ているのでどちらか削除
const { optionPriceToString } = titleValueService();

export const OptionDetailBox: FC<Props> = (props) => {
  const { options, fontSize, my, title, kind } = props;
  const [data, setData] = useState<Option>();

  const createPriceString = (val: number) => {
    const price = optionPriceToString(val);
    const more = data && data.moreCharge ? "〜" : "";
    return price + more;
  };

  useEffect(() => {
    const judge = options.find((option) => option.kind === kind);
    setData(judge);
  }, [options, kind]);

  return (
    <>
      <Flex
        // fontSize={fontSize}
        w={"50%"}
        my={my || { md: "1em", sm: "0.5em" }}
        wrap={"wrap"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text
          fontSize={
            data ? ".8em" : ".7em"
            // sm: data.value && data.value !== "ー" ? ".9em" : ".8em",
          }
          w="50%"
          fontWeight={data ? "bold" : ""}
        >
          {title}
        </Text>
        <Stack w="50%" textAlign={"left"} fontSize={{ md: "1em", sm: ".9em" }}>
          <Box>
            <StatusText
              text={data ? createPriceString(data.price) : "ー"}
              first={"無料"}
              second={data ? createPriceString(data.price) : ""}
              other={"ー"}
            />
          </Box>
          {data?.terms && <Text fontSize={".6em"}>{data?.terms}</Text>}
        </Stack>
      </Flex>
    </>
  );
};
