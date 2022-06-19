import { Box, Stack, Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

const PolicyBox: FC<Props> = ({ title, children }) => {
  return (
    <Box>
      <Text as="h2" fontSize={"1.2rem"}>
        {title}
      </Text>
      <Box borderBottom={"1px"}></Box>
      <Stack spacing={"1em"} p="1.5rem 1rem">
        {children}
      </Stack>
    </Box>
  );
};
export default PolicyBox;
