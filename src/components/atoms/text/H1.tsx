import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FC, memo, useEffect, useState, VFC } from "react";
import { TopResource } from "../../../../resorces/TopResource";

type Props = {
  title: string;
};
export const H1: FC<Props> = (props) => {
  const { title } = props;

  return (
    <Text
      as="h1"
      fontSize={{ md: "1.8rem", sm: "1.4rem" }}
      py={"4em"}
      textAlign="center"
    >
      {title}
    </Text>
  );
};
