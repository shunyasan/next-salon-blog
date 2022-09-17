import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
import { IdAndNameDto } from "types/IdAndNameDto";

type Props = {
  src: string;
  alt: string;
};

export const ImageInColumn: FC<Props> = ({ src, alt }) => {
  return (
    <Box
      mx={"auto"}
      width={{ md: "100%", sm: "100%" }}
      height={{ md: "30vw", sm: "70vw" }}
      pos="relative"
    >
      <Image layout="fill" objectFit={"contain"} src={src} alt={alt} />
    </Box>
  );
};
