import { Box, Collapse, Stack, Text, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
import { IdAndNameDto } from "types/IdAndNameDto";

type Props = {
  title: string;
  quote: string;
  height: { md: string; sm: string } | string;
  src: string;
};

export const QuotePhotoBox: FC<Props> = ({ height, src, title, quote }) => {
  return (
    <Box my={"1.5em"}>
      <Box
        mx={"auto"}
        width={{ md: "100%", sm: "100%" }}
        height={height}
        pos="relative"
      >
        <Image layout="fill" objectFit={"contain"} src={src} alt={title} />
      </Box>
      <Box fontSize={".8em"} textAlign={"center"} mt="5px">
        <Text>{title}</Text>
        <Text>{quote} </Text>
      </Box>
    </Box>
  );
};
