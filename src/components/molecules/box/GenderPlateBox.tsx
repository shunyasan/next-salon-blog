import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Gender } from "types/Gender";

type Props = {
  gender: string;
  onClick: (gender: Gender) => void;
  fontSize: string | { md: string; sm: string };
};

export const GenderPlateBox: FC<Props> = ({ gender, onClick, fontSize }) => {
  return (
    <Flex
      // w={{ md: "inherit", sm: "30%" }}
      fontSize={fontSize}
      justifyContent="center"
    >
      <Text
        as="button"
        cursor={"pointer"}
        p={"0.5rem 1rem"}
        color={gender === "lady" ? "originWhite" : ""}
        bg={gender === "lady" ? "originBlack" : ""}
        onClick={() => onClick("lady")}
        transition={"0.2s"}
        transitionTimingFunction={"linear"}
      >
        女性
      </Text>
      <Text
        as="button"
        cursor={"pointer"}
        p={"0.5rem 1rem"}
        color={gender === "men" ? "originWhite" : ""}
        bg={gender === "men" ? "originBlack" : ""}
        onClick={() => onClick("men")}
        transition={"0.2s"}
        transitionTimingFunction={"linear"}
      >
        男性
      </Text>
    </Flex>
  );
};
