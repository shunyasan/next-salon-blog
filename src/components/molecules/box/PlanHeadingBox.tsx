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
    <Flex
      justifyContent={"left"}
      mt="-1px"
      display={{ md: "flex", sm: "block" }}
    >
      <Center
        py=".3em"
        w={{ md: "30%", sm: "100%" }}
        fontWeight={"bold"}
        fontSize={".9em"}
        bg="#eee"
        border="1px"
        borderColor={"#ddd"}
      >
        {title}
      </Center>
      <Flex
        // minH="6em"
        p="1em"
        justifyContent={"space-evenly"}
        w={{ md: "70%", sm: "100%" }}
        alignItems={"center"}
        border="1px"
        borderColor={"#ddd"}
        wrap={"wrap"}
        ml={{ md: "-1px", sm: "0" }}
        mt={{ md: "0", sm: "-1px" }}
      >
        {children}
      </Flex>
    </Flex>
  );
};
