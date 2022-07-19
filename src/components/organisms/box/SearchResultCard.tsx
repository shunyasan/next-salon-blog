import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AboutCategory, BaseParts, OriginCategory } from "@prisma/client";
import { OrderPlanTitle } from "enums/OrderPlanTitle";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import { OrderPlanIdName } from "types/OrderPlanIdName";
import { TitleValue } from "types/TitleValue";
import { PlanResearchModal } from "../modal/PlanResearchModal";
import { ResultCardBox } from "./ResultCardBox";

type Props = {
  orderPlan: OrderPlanIdName;
  // resetPages: () => void;
  originCategories: OriginCategory[];
  aboutCategories: AboutCategory[];
  baseParts: BaseParts[];
};

export const SearchResultCard: FC<Props> = (props) => {
  const {
    orderPlan,
    // resetPages,
    originCategories,
    aboutCategories,
    baseParts,
  } = props;

  // const [baseData, setBaseData] = useState<TitleValue[]>([]);
  // const [partsData, setPartsData] = useState<TitleValue[]>([]);
  // const [yourData, setYourData] = useState<TitleValue[]>([]);
  // const [clinicData, setClinicData] = useState<TitleValue[]>([]);
  // const [planData, setplanData] = useState<TitleValue[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const your: TitleValue[] = [
    {
      title: OrderPlanTitle.gender,
      value: orderPlan.gender.name,
    },
    {
      title: OrderPlanTitle.aboutCategory,
      value: orderPlan.aboutCategory.name,
    },
    {
      title: OrderPlanTitle.parts,
      value: orderPlan.parts.name,
    },
    {
      title: OrderPlanTitle.skinCollor,
      value: orderPlan.skinCollor.name,
    },
    {
      title: OrderPlanTitle.hair,
      value: orderPlan.hair.name,
    },
  ];
  const clinic: TitleValue[] = [
    {
      title: OrderPlanTitle.roomType,
      value: orderPlan.roomType.name,
    },
    {
      title: OrderPlanTitle.interior,
      value: orderPlan.interior.name,
    },
    {
      title: OrderPlanTitle.staff,
      value: orderPlan.staff.name,
    },
  ];

  const plan: TitleValue[] = [
    {
      title: OrderPlanTitle.card,
      value: orderPlan.card.name,
    },
    {
      title: OrderPlanTitle.loan,
      value: orderPlan.loan.name,
    },
    {
      title: OrderPlanTitle.contract,
      value: orderPlan.contract.name,
    },
  ];

  const view: TitleValue[] = [
    {
      title: OrderPlanTitle.paySystem,
      value: orderPlan.paySystem.name,
    },
    {
      title: OrderPlanTitle.sort,
      value: orderPlan.sort.name,
    },
  ];

  return (
    <>
      <Box border={"1px"} p={"1rem"}>
        <Stack
          spacing={"0.5rem"}
          wrap={"wrap"}
          justifyContent={"space-evenly"}
          fontSize={"0.8rem"}
        >
          {/* <Box mb={"1rem"}>
            <Text
              maxW={"9em"}
              bg={"originLiteGray"}
              border={"1px"}
              borderColor={"originBlack"}
            >
              性別
            </Text>
            <Text fontSize={"1rem"} fontWeight={"bold"}>
              {orderPlan.gender.name}
            </Text>
          </Box>
          <Box
          // なぜか縦が言うこと聞かない
          //
          // h={"7rem"}
          >
            <Text
              maxW={"9em"}
              bg={"originLiteGray"}
              border={"1px"}
              borderColor={"originBlack"}
            >
              部位
            </Text>
            {partsData.map((data, i) => (
              <ResultCardBox key={i} title={data.title} value={data.value} />
            ))}
          </Box> */}
          <Box>
            <Text
              maxW={"9em"}
              bg={"originLiteGray"}
              border={"1px"}
              borderColor={"originBlack"}
            >
              自分
            </Text>
            {your.map((data, i) => (
              <ResultCardBox key={i} title={data.title} value={data.value} />
            ))}
          </Box>
          <Box>
            <Text
              maxW={"9em"}
              bg={"originLiteGray"}
              border={"1px"}
              borderColor={"originBlack"}
            >
              クリニック
            </Text>
            {clinic.map((data, i) => (
              <ResultCardBox key={i} title={data.title} value={data.value} />
            ))}
          </Box>
          <Box
          // h={"7rem"}
          >
            <Text
              maxW={"9em"}
              bg={"originLiteGray"}
              border={"1px"}
              borderColor={"originBlack"}
            >
              プラン
            </Text>
            {plan.map((data, i) => (
              <ResultCardBox key={i} title={data.title} value={data.value} />
            ))}
          </Box>
          <Box
          // h={"7rem"}
          >
            <Text
              maxW={"9em"}
              bg={"originLiteGray"}
              border={"1px"}
              borderColor={"originBlack"}
            >
              表示
            </Text>
            {view.map((data, i) => (
              <ResultCardBox key={i} title={data.title} value={data.value} />
            ))}
          </Box>
        </Stack>
        <Box mt={"0.5rem"}>
          <Button onClick={onOpen} w={"10em"} variant={"gold"} size={"xs"}>
            条件を変更
          </Button>
        </Box>
      </Box>
      <PlanResearchModal
        orderPlan={orderPlan}
        isOpen={isOpen}
        onClose={onClose}
        // resetPages={resetPages}
        originCategories={originCategories}
        aboutCategories={aboutCategories}
        baseParts={baseParts}
      />
    </>
  );
};
