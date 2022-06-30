import { FC, VFC } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

type Props = {
  targetValue: string;
  checkValue: string;
  text: string;
  img: string;
  onClick?: () => void;
};

export const ImageAndTextBox: FC<Props> = (props) => {
  const { onClick, targetValue, text, img, checkValue } = props;
  return (
    <Box
      width={{ md: "14em", sm: "10em" }}
      h={{ md: "12em", sm: "8em" }}
      shadow={targetValue === checkValue ? "0 0 3px 2px #888" : "md"}
      m={{ md: "2em", sm: ".7em" }}
      cursor="pointer"
      onClick={onClick}
      // filter={
      //   targetValue === (id || value) ? "brightness(50%)" : "brightness(100%)"
      // }
    >
      <Image
        w="100%"
        h={{ md: "10em", sm: "6em" }}
        objectFit="cover"
        src={img}
        alt={text}
      />
      <Text h={"2em"} lineHeight={"2em"}>
        {text}
      </Text>
    </Box>
  );
};
