import { Flex, HStack, Text } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  title: string;
  value: string;
  link?: string;
};

const TitleAndValueBox: FC<Props> = ({ title, value, link }) => {
  return (
    <Flex>
      <Text
        w="35%"
        bg={"originBlack"}
        color={"originWhite"}
        border={"1px"}
        borderColor={"originBlack"}
      >
        {title}
      </Text>
      <Text
        as="a"
        w="65%"
        border={"1px"}
        borderColor={"originBlack"}
        href={link || undefined}
        _hover={{
          color: link ? "originBlack" : undefined,
          textDecoration: link ? "underline" : undefined,
        }}
      >
        {value}
      </Text>
    </Flex>
  );
};

export default TitleAndValueBox;
