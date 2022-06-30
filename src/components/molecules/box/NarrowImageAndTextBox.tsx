import { FC, VFC } from "react";
import { Box, Image, Text } from "@chakra-ui/react";

type Props = {
  targetValue: string;
  value: string;
  img: string;
  id?: string;
  onClick?: () => void;
};

export const NarrowImageAndTextBox: FC<Props> = (props) => {
  const { onClick, targetValue, value, img, id } = props;
  return (
    <Box
      width={{ md: "14rem", sm: "9rem" }}
      shadow="xl"
      m={"0.5em"}
      cursor="pointer"
      onClick={onClick}
      filter={targetValue === id ? "brightness(50%)" : "brightness(100%)"}
    >
      <Image src={img} alt="イメージ画像" />
      <Text p="1em">{value}</Text>
    </Box>
  );
};
