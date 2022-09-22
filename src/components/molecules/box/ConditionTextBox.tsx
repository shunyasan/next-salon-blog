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
    <Flex
      justifyContent={"left"}
      mt="-1px"
      display={{ md: "flex", sm: "block" }}
    >
      <Center
        py=".3em"
        w={{ md: "30%", sm: "100%" }}
        fontWeight={"bold"}
        fontSize={".9em"}
        bg="#eee"
        border="1px"
        borderColor={"#ddd"}
      >
        {title}
      </Center>
      <Flex
        // minH="8em"
        p="1em"
        justifyContent={"space-evenly"}
        w={{ md: "70%", sm: "100%" }}
        alignItems={"center"}
        border="1px"
        borderColor={"#ddd"}
        wrap={"wrap"}
        ml={{ md: "-1px", sm: "0" }}
        mt={{ md: "0", sm: "-1px" }}
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
