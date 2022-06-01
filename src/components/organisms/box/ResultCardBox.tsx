import { Flex, Text } from "@chakra-ui/react";
import { FC, memo, VFC } from "react";

type Props = {
  title: string;
  value: string;
};

export const ResultCardBox: FC<Props> = (props) => {
  const { title, value } = props;
  return (
    <Flex
      fontSize={"0.8rem"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
      w={"100%"}
      my={"0.5rem"}
      textAlign={"center"}
    >
      <Text
        w={"9rem"}
        fontWeight={"bold"}
        // bg={"originLiteGray"}
        // border={"1px"}
        // borderColor={"originBlack"}
      >
        {title}
      </Text>
      <Text w={"9rem"} fontSize={"0.9em"}>
        {value}
      </Text>
    </Flex>
  );
};
