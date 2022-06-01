import { IconButton, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  targetValue: string | number;
  id: string | number;
  value: string;
  onClick?: () => void;
};

export const PlanTextBox: FC<Props> = (props) => {
  const { targetValue, value, id, onClick } = props;
  return (
    <Flex
      w="18rem"
      h={"10rem"}
      justifyContent={"center"}
      alignItems={"center"}
      shadow={targetValue === id ? "0 0 3px 2px #888" : "md"}
      cursor="pointer"
      py="0.5rem"
      m={{ md: "2rem !important", sm: "1rem !important" }}
      onClick={onClick}
    >
      {value}
    </Flex>
  );
};
