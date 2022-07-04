import { Box, Center, Flex, HStack, Select, Text } from "@chakra-ui/react";
import { PlanSortSelect } from "components/atoms/select/PlanSortSelect";
import { FC } from "react";
import { defaultSort } from "services/app/orderPlanIdNameService";
import { IdAndNameDto } from "types/IdAndNameDto";

type Props = {
  orderData: IdAndNameDto;
  onChange: (idName: IdAndNameDto) => void;
};
export const PlanSortBox: FC<Props> = ({ onChange, orderData }) => {
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
        並べ替え
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
        <PlanSortSelect idName={orderData} onChange={onChange} />
      </Flex>
    </Flex>
  );
};
