import { FC, VFC } from "react";
import { Box, Image, Text } from "@chakra-ui/react";

type Props = {
  targetValue: string;
  value: string;
  img: string;
  onClick?: () => void;
  id?: string;
};

export const ImageAndTextBox: FC<Props> = (props) => {
  const { onClick, targetValue, value, img, id } = props;
  return (
    <Box
      w={"14em"}
      shadow={targetValue === (id || value) ? "0 0 3px 2px #888" : "md"}
      m={{ md: "2em !important", sm: "1em !important" }}
      cursor="pointer"
      onClick={onClick}
      // filter={
      //   targetValue === (id || value) ? "brightness(50%)" : "brightness(100%)"
      // }
    >
      <Image src={img} alt={value} />
      <Text p="1em">{value}</Text>
    </Box>
  );
};
