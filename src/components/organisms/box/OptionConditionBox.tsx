import {
  Box,
  Center,
  Flex,
  HStack,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PlanContractSelect } from "components/atoms/select/PlanContractSelect";
import { PlanOptionSelect } from "components/atoms/select/PlanOptionSelect";
import { PlanSortSelect } from "components/atoms/select/PlanSortSelect";
import { PlanHeadingBox } from "components/molecules/box/PlanHeadingBox";
import { FC } from "react";
import { IdAndNameDto } from "types/IdAndNameDto";
import { OrderPlanIdName } from "types/OrderPlanIdName";

type Props = {
  orderData: OrderPlanIdName;
  onChange: (orderPlan: OrderPlanIdName) => void;
};
export const OptionConditionBox: FC<Props> = ({ onChange, orderData }) => {
  // const onChangeSort = useCallback(
  //   (value: string) => {
  //     setSelectSortPlan(value);
  //     onChange(value);
  //   },
  //   [onChange]
  // );

  // firstVisitFees:
  // revisitFees:
  // anesthesia:
  // shaving:
  // aftercare:
  // leakage:
  // skinTrouble:

  return (
    <>
      <PlanHeadingBox title="オプション">
        <Stack w="100%">
          <Flex alignItems={"center"} justifyContent="space-between">
            <Text w="40%">初診料</Text>
            <Box w="60%">
              <PlanOptionSelect
                idName={orderData.firstVisitFees}
                onChange={(idName: IdAndNameDto) =>
                  onChange({ ...orderData, firstVisitFees: idName })
                }
              />
            </Box>
          </Flex>
          <Flex alignItems={"center"} justifyContent="space-between">
            <Text w="40%">再診料</Text>
            <Box w="60%">
              <PlanOptionSelect
                idName={orderData.revisitFees}
                onChange={(idName: IdAndNameDto) =>
                  onChange({ ...orderData, revisitFees: idName })
                }
              />
            </Box>
          </Flex>
          <Flex alignItems={"center"} justifyContent="space-between">
            <Text w="40%">麻酔</Text>
            <Box w="60%">
              <PlanOptionSelect
                idName={orderData.anesthesia}
                onChange={(idName: IdAndNameDto) =>
                  onChange({ ...orderData, anesthesia: idName })
                }
              />
            </Box>
          </Flex>
          <Flex alignItems={"center"} justifyContent="space-between">
            <Text w="40%">剃毛</Text>
            <Box w="60%">
              <PlanOptionSelect
                idName={orderData.shaving}
                onChange={(idName: IdAndNameDto) =>
                  onChange({ ...orderData, shaving: idName })
                }
              />
            </Box>
          </Flex>
          <Flex alignItems={"center"} justifyContent="space-between">
            <Text w="40%">アフターケア</Text>
            <Box w="60%">
              <PlanOptionSelect
                idName={orderData.aftercare}
                onChange={(idName: IdAndNameDto) =>
                  onChange({ ...orderData, aftercare: idName })
                }
              />
            </Box>
          </Flex>
          <Flex alignItems={"center"} justifyContent="space-between">
            <Text w="40%">照射漏れ</Text>
            <Box w="60%">
              <PlanOptionSelect
                idName={orderData.leakage}
                onChange={(idName: IdAndNameDto) =>
                  onChange({ ...orderData, leakage: idName })
                }
              />
            </Box>
          </Flex>
          <Flex alignItems={"center"} justifyContent="space-between">
            <Text w="40%">肌トラブル</Text>
            <Box w="60%">
              <PlanOptionSelect
                idName={orderData.skinTrouble}
                onChange={(idName: IdAndNameDto) =>
                  onChange({ ...orderData, skinTrouble: idName })
                }
              />
            </Box>
          </Flex>
          <Flex alignItems={"center"} justifyContent="space-between">
            <Text w="40%">途中解約</Text>
            <Box w="60%">
              <PlanContractSelect
                idName={orderData.contract}
                onChange={(idName: IdAndNameDto) =>
                  onChange({ ...orderData, contract: idName })
                }
              />
            </Box>
          </Flex>
        </Stack>
      </PlanHeadingBox>
    </>
  );
};
