import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AboutCategory, BaseParts, OriginCategory } from "@prisma/client";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { useRouter } from "next/router";
import { FC, memo, useCallback, useState, VFC } from "react";
import { HomeFeatureText } from "types/HomeFeatureText";
import { OrderPlanIdName } from "types/OrderPlanIdName";
import { TitleValue } from "types/TitleValue";
import { PlanResearchModal } from "../modal/PlanResearchModal";

type Props = {
  orderPlan: OrderPlanIdName;
  // resetPages: () => void;
  condition: TitleValue[];
  partsName: string;
  // originCategories: OriginCategory[];
  // aboutCategories: AboutCategory[];
  // baseParts: BaseParts[];
  // setLoading: () => void;
};
export const MobileSearchCondotionBox: FC<Props> = ({
  orderPlan,
  // resetPages,
  condition,
  partsName,
  // setLoading,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickSearch = () => {
    // setLoading();
    onClose();
  };

  return (
    <>
      <Stack justifyContent={"center"}>
        {/* <Text textAlign={"center"}>検索条件</Text> */}
        <Box
          border={"1px"}
          borderColor={"#777"}
          borderRadius={"4px"}
          fontSize=".9em"
          bg="#f4f4f4"
        >
          <Flex p="1em" justifyContent={"space-between"} alignItems={"center"}>
            <Flex>
              <Text fontWeight={"bold"} w="5em" flexShrink={"0"}>
                部位
              </Text>
              <Text color={"#555"}>{partsName}</Text>
            </Flex>
            <Text
              fontSize={".8em"}
              color={"originGold"}
              flexShrink={"0"}
              onClick={onOpen}
              cursor="pointer"
            >
              変更
            </Text>
          </Flex>
          <Box borderBottom={"1px"} borderColor={"#bbb"}></Box>
          <Flex
            p="1em"
            h="5em"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Flex alignItems={"center"} h="100%" overflow={"hidden"}>
              <Text fontWeight={"bold"} w="5em" flexShrink={"0"}>
                詳細条件
              </Text>
              <Text
                color={"#555"}
                fontSize={".8em"}
                pr="5px"
                h="100%"
                overflow={"hidden"}
                textOverflow={"ellipsis"}
              >
                {condition.map((data) => `【${data.title}】${data.value}  |`)}
              </Text>
            </Flex>
            <Text
              fontSize={".8em"}
              color={"originGold"}
              flexShrink={"0"}
              onClick={onOpen}
              cursor="pointer"
            >
              変更
            </Text>
          </Flex>
        </Box>
        {/* <Flex justifyContent={"center"}>
        <Button w="50%" variant={"gold"} size={"xs"}>
          条件を変更
        </Button>
      </Flex> */}
      </Stack>
      <PlanResearchModal
        orderPlan={orderPlan}
        isOpen={isOpen}
        onClose={onClickSearch}
        // resetPages={resetPages}
        // originCategories={originCategories}
        // aboutCategories={aboutCategories}
        // baseParts={baseParts}
      />
    </>
  );
};
