import { Box, Button, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { BaseParts } from "@prisma/client";
import { FC, memo, VFC } from "react";

type Props = {
  parts: BaseParts;
  width: string;
  //↓消す予定
  onOpen?: () => void;
  search?: () => void;
  // 1:女性 2:男性
};
export const PartsBox: FC<Props> = (props) => {
  const { parts, width, search, onOpen } = props;
  return (
    <Stack
      w={width}
      p={"5px 8px"}
      spacing="0.7rem"
      // textAlign={"center"}
      // onClick={() => getId(category.id)}
    >
      <Box pl="4rem" textAlign={"left"} color={"originGold"} onClick={search}>
        <Text as="a">・</Text>
        <Link textDecoration="underline">{parts.name}</Link>
      </Box>
      {/* <Box>
        <Text pb={"3px"} fontSize={"0.5em"} onClick={search} cursor={"pointer"}>
          このプランを探す
        </Text>
      </Box> */}
    </Stack>
  );
};
