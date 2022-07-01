import { Box, Center, Flex, Link, Text } from "@chakra-ui/react";
import { FC, memo, VFC } from "react";

type Props = {
  title: string;
  orderData: string;
  texts: { id: string; text: string }[];
  onClick: (val: string, id: string) => void;
};
export const ConditionText: FC<Props> = (props) => {
  const { title, orderData, texts, onClick } = props;
  return (
    <Flex justifyContent={!title ? "space-evenly" : ""} mt="-1px">
      <Center
        h="6em"
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
        justifyContent={"space-evenly"}
        w={{ md: "70%", sm: "72%" }}
        alignItems={"center"}
        border="1px"
        borderColor={"#ddd"}
        ml="-1px"
      >
        {texts.map((data, int) => (
          <Text
            as="a"
            key={int}
            cursor={"pointer"}
            p={orderData === data.id ? "2px 5px" : ""}
            color={orderData === data.id ? "originWhite" : "originBlack"}
            bg={orderData === data.id ? "originBlack" : ""}
            onClick={() => onClick(data.text, data.id)}
          >
            {data.text}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};
