import {
  Box,
  Center,
  Flex,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AboutCategory, BaseParts, OriginCategory } from "@prisma/client";
import TreatmentPartsBox from "components/organisms/box/TreatmentPartsBox";
import { OrderPlanTitle } from "enums/OrderPlanTitle";
import { FC, memo, useState, VFC } from "react";
import { json } from "stream/consumers";
import { OrderPlanIdName } from "types/OrderPlanIdName";
import { IdAndNameDto } from "types/IdAndNameDto";
import SelectMachineBox from "components/organisms/box/SelectMachineBox";

type Props = {
  title: string;
  orderPlan: OrderPlanIdName;
  onClick: (machineIds: IdAndNameDto[]) => void;
};
export const ConditionMachineBox: FC<Props> = (props) => {
  const { title, onClick, orderPlan } = props;
  // const [partsModal, setPartsModal] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const [machineName, setMachineName] = useState<IdAndNameDto>({
  //   id: "test",
  //   name: "test",
  // });

  return (
    <>
      <Flex justifyContent={!title ? "space-evenly" : ""} mt="-1px">
        <Center
          minH="8em"
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
        >
          <Text w="75%">
            {orderPlan.machineIds.length > 0
              ? orderPlan.machineIds.map((machine) => machine.name + "｜")
              : "指定なし"}
          </Text>
          <Text color={"originGold"} onClick={onOpen} cursor="pointer">
            変更
          </Text>
        </Flex>
        {/* </Flex> */}
      </Flex>
      <SelectMachineBox
        onClick={(machineIds) => onClick(machineIds)}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
