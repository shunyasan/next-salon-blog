import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FC, memo, ReactNode, useEffect, useState, VFC } from "react";
import { TopResource } from "../../../../resorces/TopResource";

type Props = {
  children: ReactNode;
  // my: { md: string; sm: string } | string;
};
export const Sentence: FC<Props> = (props) => {
  const { children } = props;

  return (
    <Text fontSize={"1em"} my={"1.5em"}>
      {children}
    </Text>
  );
};
