import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { BaseParts } from "@prisma/client";
import { FC, memo, VFC } from "react";

type Props = {
  parts: BaseParts;
  width: string;
  search?: () => void;
  // 1:女性 2:男性
};
export const PartsBox: FC<Props> = (props) => {
  const { parts, width, search } = props;
  return (
    <Stack
      w={width}
      px={"8px"}
      spacing="0.7rem"
      // onClick={() => getId(category.id)}
    >
      <Text pt={"0.7rem"}>{parts.name}</Text>
      <Box>
        <Button
          variant={"whiteNotSpace"}
          p={"3px"}
          fontSize={"0.5em"}
          onClick={search}
        >
          詳細
        </Button>
      </Box>
      <Box>
        <Text p={"3px"} fontSize={"0.5em"} onClick={search} cursor={"pointer"}>
          このプランを探す
        </Text>
      </Box>
    </Stack>
  );
};
