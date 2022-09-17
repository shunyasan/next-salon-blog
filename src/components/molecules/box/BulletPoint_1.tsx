import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";
import { IdAndNameDto } from "types/IdAndNameDto";

type Props = {
  texts: string[];
};

export const BulletPoint_1: FC<Props> = ({ texts }) => {
  return (
    <Box my={"1.5em"}>
      {texts.map((text, i) => (
        <Text key={i} pl={"1em"}>
          <Text as={"span"} mr="1em">
            {i + 1}.
          </Text>
          {text}
        </Text>
      ))}
    </Box>
  );
};
