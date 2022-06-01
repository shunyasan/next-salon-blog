import { Box, Center, Flex, Link, Text } from "@chakra-ui/react";
import { FC, memo, VFC } from "react";

type Props = {
  title?: string;
  orderData: string;
  texts: { id: string; text: string }[];
  onClick: (val: string, id: string) => void;
};
export const ConditionText: FC<Props> = (props) => {
  const { title, orderData, texts, onClick } = props;
  return (
    <Flex fontSize={"0.8rem"} justifyContent={!title ? "space-evenly" : ""}>
      {title && (
        <Center w={{ md: "30%", sm: "38%" }} fontWeight={"bold"}>
          {title}
        </Center>
      )}
      <Flex
        justifyContent={"space-evenly"}
        w={{ md: "70%", sm: "62%" }}
        alignItems={"center"}
      >
        {texts.map((data, int) => (
          <Link
            key={int}
            p={orderData === data.id ? "2px 5px" : ""}
            color={orderData === data.id ? "originWhite" : "originBlack"}
            bg={orderData === data.id ? "originBlack" : ""}
            onClick={() => onClick(data.text, data.id)}
          >
            {data.text}
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};
