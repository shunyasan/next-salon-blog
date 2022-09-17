import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FC, memo, ReactNode, useEffect, useState, VFC } from "react";
import { BiLinkExternal } from "react-icons/bi";

type Props = {
  children: ReactNode;
  url: string;
  // my: { md: string; sm: string } | string;
};
export const LinkSentence: FC<Props> = (props) => {
  const { children, url } = props;

  return (
    <Text
      as="a"
      display={"inline-block"}
      fontSize={"1em"}
      my={"1.5em"}
      href={url}
      color={"originGold"}
      borderBottom={"1px"}
    >
      <Icon as={BiLinkExternal} />
      {children}
    </Text>
  );
};
