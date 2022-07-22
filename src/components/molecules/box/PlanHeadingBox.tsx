import { Box, Center, Flex, HStack, Select, Text } from "@chakra-ui/react";
import { PlanSortSelect } from "components/atoms/select/PlanSortSelect";
import { FC, ReactNode } from "react";
import { IdAndNameDto } from "types/IdAndNameDto";

type Props = {
  title: string;
  children: ReactNode;
  // orderData: IdAndNameDto;
  // onChange: (idName: IdAndNameDto) => void;
};
export const PlanHeadingBox: FC<Props> = ({ title, children }) => {
  // const onChangeSort = useCallback(
  //   (value: string) => {
  //     setSelectSortPlan(value);
  //     onChange(value);
  //   },
  //   [onChange]
  // );

  return (
    <Flex justifyContent={"space-evenly"} mt="-1px">
      <Center
        minH="6em"
        // py="1em"
        w={{ md: "30%", sm: "28%" }}
        fontWeight={"bold"}
        bg="#eee"
        border="1px"
        borderColor={"#ddd"}
      >
        {title}
      </Center>
      <Flex
        p=".5em"
        justifyContent={"space-evenly"}
        w={{ md: "70%", sm: "72%" }}
        alignItems={"center"}
        border="1px"
        borderColor={"#ddd"}
        ml="-1px"
        wrap={"wrap"}
      >
        {children}
      </Flex>
    </Flex>
  );
};
