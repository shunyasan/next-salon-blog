import { Box, Center, Text } from "@chakra-ui/layout";
import { FC, memo, ReactNode, useEffect, useState, VFC } from "react";

type Props = {
  children: ReactNode;
  fontSize?: string;
  bg?: string;
  color?: string;
};

export const InlineTitleBadge: FC<Props> = (props) => {
  const { children, fontSize, bg, color } = props;

  return (
    <Text
      px={"0.6rem"}
      display={"inline-block"}
      border={"2px"}
      fontSize={fontSize || "0.7rem"}
      bg={bg || ""}
      color={color || ""}
    >
      {children}
    </Text>
  );
};
