import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FC, memo, useEffect, useState, VFC } from "react";
import { TopResource } from "../../../../resorces/TopResource";

type Props = {
  title: string;
  // my: { md: string; sm: string } | string;
};
export const H2: FC<Props> = (props) => {
  const { title } = props;

  return (
    <Text
      as="h2"
      fontWeight={"bold"}
      fontSize={{ md: "1.3em", sm: "1.4em" }}
      borderBottom={"1px"}
      mt={"4em"}
      mb={"2em"}
      pb="5px"
      id={title}
    >
      {title}
    </Text>
  );
};
