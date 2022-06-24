import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  gender: string;
  onClick: (gender: string) => void;
};

export const GenderPlateBox: FC<Props> = ({ gender, onClick }) => {
  return (
    <Flex
      // w={{ md: "inherit", sm: "30%" }}
      fontSize={{ md: "1.3rem", sm: "1rem" }}
      justifyContent="center"
    >
      <Text
        as="button"
        cursor={"pointer"}
        p={"0.5rem 1rem"}
        color={gender === "女性" ? "originWhite" : ""}
        bg={gender === "女性" ? "originBlack" : ""}
        onClick={() => onClick("女性")}
        transition={"0.2s"}
        transitionTimingFunction={"linear"}
      >
        女性
      </Text>
      <Text
        as="button"
        cursor={"pointer"}
        p={"0.5rem 1rem"}
        color={gender === "男性" ? "originWhite" : ""}
        bg={gender === "男性" ? "originBlack" : ""}
        onClick={() => onClick("男性")}
        transition={"0.2s"}
        transitionTimingFunction={"linear"}
      >
        男性
      </Text>
    </Flex>
  );
};
