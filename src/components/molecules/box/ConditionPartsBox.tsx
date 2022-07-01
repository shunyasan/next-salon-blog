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
import { OrderPlanEnum } from "enums/OrderPlanEnum";
import { FC, memo, useState, VFC } from "react";
import { json } from "stream/consumers";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { IdAndNameDto } from "types/IdAndNameDto";

type Props = {
  title: string;
  orderPlan: OrderPlanIdName;
  originCategories: OriginCategory[];
  aboutCategories: AboutCategory[];
  baseParts: BaseParts[];
  onClick: (
    origin: IdAndNameDto,
    about: IdAndNameDto,
    parts: IdAndNameDto
  ) => void;
};
export const ConditionPartsBox: FC<Props> = (props) => {
  const {
    title,
    originCategories,
    aboutCategories,
    baseParts,
    onClick,
    orderPlan,
  } = props;
  // const [partsModal, setPartsModal] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex justifyContent={!title ? "space-evenly" : ""} mt="-1px">
        <Center
          h="10em"
          w={{ md: "30%", sm: "28%" }}
          fontWeight={"bold"}
          bg="#eee"
          border="1px"
          borderColor={"#ddd"}
        >
          {title}
        </Center>
        <Flex
          justifyContent={"space-evenly"}
          w={{ md: "70%", sm: "72%" }}
          alignItems={"center"}
          border="1px"
          borderColor={"#ddd"}
          ml="-1px"
        >
          <Stack w="75%">
            <Flex>
              <Text w="40%" mr="5px" fontWeight={"bold"}>
                {OrderPlanEnum.originCategory.name}
              </Text>
              <Text>{orderPlan.originParts.name}</Text>
            </Flex>
            <Flex>
              <Text w="40%" mr="5px" fontWeight={"bold"}>
                {OrderPlanEnum.aboutCategory.name}
              </Text>
              <Text>{orderPlan.AboutCategory.name}</Text>
            </Flex>
            <Flex>
              <Text w="40%" mr="5px" fontWeight={"bold"}>
                {OrderPlanEnum.parts.name}
              </Text>
              <Text>{orderPlan.parts.name}</Text>
            </Flex>
          </Stack>
          <Link as="a" color={"originGold"} onClick={onOpen}>
            変更
          </Link>
        </Flex>
        {/* </Flex> */}
      </Flex>
      {originCategories && aboutCategories && baseParts && (
        <TreatmentPartsBox
          originCategories={originCategories}
          aboutCategories={aboutCategories}
          baseParts={baseParts}
          onClick={(origin, about, parts) => onClick(origin, about, parts)}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};
