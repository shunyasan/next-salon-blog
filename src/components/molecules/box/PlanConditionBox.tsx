import { FC, VFC } from "react";
import { IconButton, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { StaffGenderText } from "components/atoms/text/StaffGenderText";
import { StatusText } from "components/atoms/text/StatusText";
import { Icon } from "@chakra-ui/icons";
import { Gender } from "@prisma/client";

type Props = {
  title: string;
  text: string | number;
  fontWeight: boolean;
  icon: any;
  first?: string;
  second?: string;
  fontSize?: { md: string; sm: string };
  other?: string;
  gender?: Gender;
  // width: string;
  // paddingY?: string;
  // onClick?: () => void;
};

export const PlanConditionBox: FC<Props> = (props) => {
  const {
    title,
    text,
    first,
    second,
    fontSize,
    other,
    gender,
    fontWeight,
    icon,
  } = props;
  return (
    <Flex
      // justifyContent={"space-around"}
      justifyContent={"space-around"}
      alignItems={"center"}
      // textAlign={"left"}
    >
      <Flex>
        <Icon
          fontWeight={"bold"}
          fontSize={"1.3em"}
          my="auto"
          mr="3px"
          as={icon}
        />
        <Text
          color={"originLiteBlack"}
          fontWeight={fontWeight ? "bold" : ""}
          // w={"3.5rem"}
          fontSize={fontSize || "0.8em"}
        >
          {title}
        </Text>
      </Flex>

      {gender ? (
        <StaffGenderText staffGender={gender} />
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
