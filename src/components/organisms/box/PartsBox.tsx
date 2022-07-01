import { Box, Button, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { BaseParts } from "@prisma/client";
import { FC, memo, VFC } from "react";

type Props = {
  parts: BaseParts;
  width: string | { md: string; sm: string };
  //↓消す予定
  onOpen?: () => void;
  search?: () => void;
  // 1:女性 2:男性
};
export const PartsBox: FC<Props> = (props) => {
  const { parts, width, search, onOpen } = props;
  return (
    <Box
      // pl={{ md: "4em", sm: "2em" }}
      w={width}
      p={"1em .2em"}
      textAlign={"left"}
      color={"originGold"}
      onClick={search}
    >
      <Text as="a">・</Text>
      <Link textDecoration="underline">{parts.name}</Link>
    </Box>
  );
};
