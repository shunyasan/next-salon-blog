import { FC, VFC } from "react";
import { IconButton, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { StaffGenderText } from "components/atoms/text/StaffGenderText";
import { StatusText } from "components/atoms/text/StatusText";

type Props = {
  title: string;
  text: string | number;
  fontWeight: boolean;
  first?: string;
  second?: string;
  fontSize?: { md: string; sm: string };
  other?: string;
  gender?: boolean;
  // width: string;
  // paddingY?: string;
  // onClick?: () => void;
};

export const PlanConditionBox: FC<Props> = (props) => {
  const { title, text, first, second, fontSize, other, gender, fontWeight } =
    props;
  return (
    <Flex
      justifyContent={"space-around"}
      alignItems={"center"}
      // textAlign={"left"}
    >
      <Text
        color={"originLiteBlack"}
        fontWeight={fontWeight ? "bold" : ""}
        // w={"3.5rem"}
        fontSize={fontSize || "0.8em"}
      >
        {title}
      </Text>
      {gender && typeof text === "number" ? (
        <StaffGenderText staffGender={text} />
      ) : (
        <Flex alignItems={"center"}>
          <StatusText
            text={text}
            first={first || ""}
            second={second || ""}
            fontSize={fontSize || { md: "0.8em", sm: "0.8em" }}
            other={other || ""}
          />
        </Flex>
      )}
    </Flex>
  );
};
