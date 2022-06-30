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
import { useRouter } from "next/router";
import { FC, memo, useCallback, useState, VFC } from "react";
import { HomeFeatureText } from "types/app/HomeFeatureText";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { TitleValue } from "types/app/TitleValue";
import { PlanResearchModal } from "../modal/PlanResearchModal";

type Props = {
  orderPlan: OrderPlanIdName;
  // resetPages: () => void;
  condition: TitleValue[];
  partsName: string;
  originCategories: OriginCategory[];
  aboutCategories: AboutCategory[];
  baseParts: BaseParts[];
};
export const MobileSearchCondotionBox: FC<Props> = ({
  orderPlan,
  // resetPages,
  condition,
  partsName,
  originCategories,
  aboutCategories,
  baseParts,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const datas:{title:string,value:string} = [
  //   {title:"",value:""},
  //   {title:"",value:""},
  //   {title:"",value:""},
  //   {title:"",value:""},
  // ]

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
            >
              変更
            </Text>
          </Flex>
          <Box borderBottom={"1px"} borderColor={"#bbb"}></Box>
          <Flex p="1em" justifyContent={"space-between"} alignItems={"center"}>
            <Flex alignItems={"center"}>
              <Text fontWeight={"bold"} w="5em" flexShrink={"0"}>
                詳細条件
              </Text>
              <Text color={"#555"} fontSize={".8em"} pr="5px">
                {condition.map((data) => `【${data.title}】${data.value}  |`)}
              </Text>
            </Flex>
            <Text
              fontSize={".8em"}
              color={"originGold"}
              flexShrink={"0"}
              onClick={onOpen}
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
      {originCategories && aboutCategories && baseParts && (
        <PlanResearchModal
          OrderPlan={orderPlan}
          isOpen={isOpen}
          onClose={onClose}
          // resetPages={resetPages}
          originCategories={originCategories}
          aboutCategories={aboutCategories}
          baseParts={baseParts}
        />
      )}
    </>
  );
};
