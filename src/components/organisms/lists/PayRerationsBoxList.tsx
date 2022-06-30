import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { StatusText } from "components/atoms/text/StatusText";
import { FC, memo, useCallback, VFC } from "react";
import { OptionText } from "types/app/OptionText";
import { FreeServiceBox } from "../box/FreeServiceBox";
type Props = {
  payments: OptionText[];
};

export const PayRerationsBoxList: FC<Props> = (props) => {
  const { payments } = props;
  return (
    <Flex wrap={"wrap"} justifyContent={"left"}>
      {payments.map((data, i) => (
        <Flex
          key={i}
          w={"50%"}
          my="0.2rem"
          // h={"4rem"}
          justifyContent={"left"}
          // spacing={"3px"}
          fontSize={data.text !== "-" ? "0.8em" : "0.8em"}
          // onClick={onClick}
          // mx={"auto"}
          // cursor={"pointer"}
        >
          <Text fontWeight={data.text !== "-" ? "bold" : ""}>{data.name}</Text>
          {/* <Box
          borderBottom={"1px"}
          borderColor={"black"}
          w={"80%"}
          mx={"auto"}
         ></Box> */}
          <Box ml="1rem" display={"inline-block"}>
            <StatusText
              text={data.text}
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
