import { Box, Center, Flex, Link, Text } from "@chakra-ui/react";
import { FC, memo, VFC } from "react";
import { IdAndNameDto } from "types/IdAndNameDto";

type Props = {
  title: string;
  orderData: string;
  texts: IdAndNameDto[];
  onClick: (idAndName: IdAndNameDto) => void;
  // onClick: (val: string, id: string) => void;
};
export const ConditionText: FC<Props> = (props) => {
  const { title, orderData, texts, onClick } = props;
  return (
    <Flex justifyContent={!title ? "space-evenly" : ""} mt="-1px">
      <Center
        minH="6em"
        // py="1em"
        w={{ md: "30%", sm: "28%" }}
        fontWeight={"bold"}
        bg="#eee"
        border="1px"
        borderColor={"#ddd"}
      >
        {title}
      </Center>
      <Flex
        p=".5em"
        justifyContent={"space-evenly"}
        w={{ md: "70%", sm: "72%" }}
        alignItems={"center"}
        border="1px"
        borderColor={"#ddd"}
        ml="-1px"
        wrap={"wrap"}
      >
        {texts.map((data, int) => (
          <Text
            key={int}
            cursor={"pointer"}
            m="3px"
            p={orderData === data.id ? "2px 5px" : ""}
            color={orderData === data.id ? "originWhite" : "originBlack"}
            bg={orderData === data.id ? "originBlack" : ""}
            onClick={() => onClick({ id: data.id, name: data.name })}
          >
            {data.name}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};
