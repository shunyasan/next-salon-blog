import { Box, Collapse, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import { IdAndNameDto } from "types/IdAndNameDto";

type Props = {
  width: { md: string; sm: string } | string;
  my: { md: string; sm: string } | string;
  texts: string[];
};

export const ContentsBox: FC<Props> = ({ width, my, texts }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box p={"1em"} my={my} width={width} mx="auto">
      <Text fontSize={"1.2em"} textAlign={"center"}>
        目次
        {/* <Text as="span" fontSize={".8em"} onClick={onToggle}>
          ［{isOpen ? "閉じる" : "開く"}］
        </Text> */}
      </Text>
      {/* <Collapse in={isOpen} animateOpacity> */}
      <Stack mt="1em">
        {texts.map((text, i) => (
          <Text
            as="a"
            key={i}
            borderBottom={"1px"}
            borderColor={"#ccc"}
            pb="5px"
            pl="5px"
            href={`#${text}`}
          >
            <Text as={"span"} mr="1em">
              {i + 1}.
            </Text>
            {text}
          </Text>
        ))}
      </Stack>
      {/* </Collapse> */}
    </Box>
  );
};
