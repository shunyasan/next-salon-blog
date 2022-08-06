import { Box, Button, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { BaseParts, BasicCategory } from "@prisma/client";
import { FC, memo, VFC } from "react";

type Props = {
  parts: BasicCategory;
  width: string | { md: string; sm: string };
  //↓消す予定
  onOpen?: () => void;
  search?: () => void;
};
export const PartsBox: FC<Props> = (props) => {
  const { parts, width, search, onOpen } = props;
  return (
    <Flex
      w={width}
      p={"1em .2em"}
      textAlign={"left"}
      color={"originGold"}
      onClick={search}
      cursor={"pointer"}
    >
      <Text>・</Text>
      <Text textDecoration="underline">{parts.name}</Text>
    </Flex>
  );
};
