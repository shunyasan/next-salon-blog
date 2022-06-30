import { Box, Stack, Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  ankerId?: string;
  fontSize?: string;
};

export const UnderLineItemBox: FC<Props> = (props) => {
  const { ankerId, title, children, fontSize } = props;

  return (
    <Stack
      spacing={"1em"}
      id={ankerId}
      pt={ankerId && "4em"}
      mt={ankerId && "-1em"}
    >
      <Text
        fontSize={fontSize}
        fontWeight={"bold"}
        textAlign={"left"}
        borderBottom={"1px"}
        as={ankerId ? "h2" : undefined}
      >
        {title}
      </Text>
      <Box>{children}</Box>
    </Stack>
  );
};
