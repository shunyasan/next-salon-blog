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

type Props = {
  title: string;
  orderPlan: OrderPlanIdName;
  // originCategories: OriginCategory[];
  // aboutCategories: AboutCategory[];
  // baseParts: BaseParts[];
  onClick: (
    origin: IdAndNameDto,
    about: IdAndNameDto,
    parts: IdAndNameDto
  ) => void;
};
export const ConditionPartsBox: FC<Props> = (props) => {
  const {
    // originCategories,
    // aboutCategories,
    // baseParts,
    title,
    onClick,
    orderPlan,
  } = props;
  // const [partsModal, setPartsModal] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
          // minH="8em"
          p="1em"
          justifyContent={"space-evenly"}
          w={{ md: "70%", sm: "100%" }}
          alignItems={"center"}
          border="1px"
          borderColor={"#ddd"}
          ml={{ md: "-1px", sm: "0" }}
          mt={{ md: "0", sm: "-1px" }}
        >
          <Stack w="75%">
            {/* <Flex>
              <Text w="40%" mr="5px" fontWeight={"bold"}>
                {OrderPlanTitle.originCategory.name}
              </Text>
              <Text>{orderPlan.originParts.name}</Text>
            </Flex> */}
            <Flex>
              <Text w="25%" flexShrink="0" mr="5px" fontWeight={"bold"}>
                {OrderPlanTitle.aboutCategory}
              </Text>
              <Text>{orderPlan.aboutCategory.name}</Text>
            </Flex>
            <Flex>
              <Text w="25%" flexShrink="0" mr="5px" fontWeight={"bold"}>
                {OrderPlanTitle.parts}
              </Text>
              <Text>{orderPlan.parts.name}</Text>
            </Flex>
          </Stack>
          <Text color={"originGold"} onClick={onOpen} cursor="pointer">
            変更
          </Text>
        </Flex>
        {/* </Flex> */}
      </Flex>
      {/* {originCategories && aboutCategories && baseParts && ( */}
      <TreatmentPartsBox
        // originCategories={originCategories}
        // aboutCategories={aboutCategories}
        // baseParts={baseParts}
        onClick={(origin, about, parts) => onClick(origin, about, parts)}
        isOpen={isOpen}
        onClose={onClose}
      />
      {/* )} */}
    </>
  );
};
