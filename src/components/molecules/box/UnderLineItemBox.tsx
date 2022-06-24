import { Box, Stack, Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
  ankerId: string;
  title: string;
  children: ReactNode;
};

export const UnderLineItemBox: FC<Props> = (props) => {
  const { ankerId, title, children } = props;

  return (
    <Stack spacing={"1em"} id={ankerId} pt="4em" mt="-1em">
      <Text
        fontWeight={"bold"}
        textAlign={"left"}
        borderBottom={"1px"}
        as={"h2"}
      >
        {title}
      </Text>
      <Box>{children}</Box>
    </Stack>
  );
};
