import { Icon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Stack, Text } from "@chakra-ui/react";
import { ConditionText } from "components/molecules/box/ConditionTextBox";
import { useRouter } from "next/router";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import { IdAndNameDto } from "types/IdAndNameDto";
import { OrderPlanIdName } from "types/OrderPlanIdName";
import { OrderPlanTitle } from "enums/OrderPlanTitle";
import { UnderLineItemBox } from "components/molecules/box/UnderLineItemBox";
import { ConditionPartsBox } from "components/molecules/box/ConditionPartsBox";
import { OrderPlanQueryService } from "services/orderPlanQueryService";
import { PlanHeadingBox } from "components/molecules/box/PlanHeadingBox";
import { PlanSortSelect } from "components/atoms/select/PlanSortSelect";
import { OptionConditionBox } from "./OptionConditionBox";
import { Gender } from "types/Gender";
import { AreaCheckBox } from "components/molecules/checkBox/AreaCheckBox";
import { ActionService } from "services/actionSearvice";
import { ActionEnum } from "@prisma/client";
import { ConditionMachineBox } from "components/molecules/box/ConditionMachineBox";

type Props = {
  orderPlan: OrderPlanIdName;
  onClose?: () => void;
};

const { createParameter } = OrderPlanQueryService();
const { createActionApi } = ActionService();

export const PlanSearchBox: FC<Props> = (props) => {
  const { orderPlan, onClose } = props;
  const router = useRouter();

  const [orderData, setOrderData] = useState<OrderPlanIdName>(orderPlan);

  const onClickSearchPlan = async () => {
    if (orderData) {
      const query = createParameter(orderData);
      createActionApi(ActionEnum.search, JSON.stringify(query));
      // resetPages();
      onClose && onClose();
      router.push({
        pathname: `/${orderData.gender.id}/plan/search/1`,
        query: query,
      });
    }
  };

  // 全ての要素をchildrenにしてコンポーネントをまとめる
  return (
    <Stack m={"auto"} textAlign={"center"} spacing={"3em"} fontSize={"0.9em"}>
      <Box>
        <UnderLineItemBox title="クリニック" fontSize="1.5em">
          <Text fontSize={"1.2em"}>クリニックについて選択してください</Text>
          <Box mt=".7em">
            <PlanHeadingBox title="地域">
              <AreaCheckBox
                onChange={(idName: IdAndNameDto) =>
                  setOrderData({ ...orderData, area: idName })
                }
              />
            </PlanHeadingBox>
            <ConditionText
              title={OrderPlanTitle.roomType}
              orderData={orderData.roomType.id}
              texts={[
                { id: "none", name: "指定なし" },
                { id: "個室", name: "個室" },
                { id: "完全個室", name: "完全個室" },
              ]}
              onClick={(idName: IdAndNameDto) =>
                setOrderData({ ...orderData, roomType: idName })
              }
            />
            <ConditionText
              title={OrderPlanTitle.interior}
              orderData={orderData.interior.id}
              texts={[
                { id: "none", name: "指定なし" },
                { id: "標準", name: "標準" },
                { id: "綺麗", name: "綺麗" },
                { id: "豪華", name: "豪華" },
              ]}
              onClick={(idName: IdAndNameDto) =>
                setOrderData({ ...orderData, interior: idName })
              }
            />
            <ConditionText
              title={OrderPlanTitle.staff}
              orderData={orderData.staff.id}
              texts={[
                { id: "none", name: "指定なし" },
                { id: "lady", name: "女性" },
                { id: "men", name: "男性" },
              ]}
              onClick={(idName: IdAndNameDto) =>
                setOrderData({ ...orderData, staff: idName })
              }
            />
          </Box>
        </UnderLineItemBox>
      </Box>
      {/* <Box>
        <UnderLineItemBox title="自分" fontSize="1.5em">
          <Text fontSize={"1.2em"}>
            脱毛を考えている箇所について選択してください
          </Text>
          <Box mt=".7em">
          </Box>
        </UnderLineItemBox>
      </Box> */}
      <Box>
        <UnderLineItemBox title="プラン" fontSize="1.5em">
          <Text fontSize={"1.2em"}>プランについて選択してください</Text>
          <Box mt=".7em" w="100%">
            <ConditionPartsBox
              title="部位"
              orderPlan={orderData}
              // originCategories={originCategories}
              // aboutCategories={aboutCategories}
              // baseParts={baseParts}
              onClick={(
                origin: IdAndNameDto,
                about: IdAndNameDto,
                parts: IdAndNameDto
              ) =>
                setOrderData({
                  ...orderData,
                  originParts: origin,
                  aboutCategory: about,
                  parts: parts,
                })
              }
            />
            <ConditionMachineBox
              title={"機器"}
              orderPlan={orderData}
              onClick={() => alert("test")}
            />
            <ConditionText
              title={OrderPlanTitle.skinCollor}
              orderData={orderData.skinCollor.id || "未選択"}
              texts={[
                { id: "soft", name: "色白い" },
                { id: "standerd", name: "平均的な肌色" },
                { id: "hard", name: "日焼け肌" },
                // { id: "未選択", name: "未選択" },
              ]}
              onClick={(idName: IdAndNameDto) =>
                setOrderData({ ...orderData, skinCollor: idName })
              }
            />
            <ConditionText
              title={OrderPlanTitle.hair}
              orderData={orderData.hair.id || "未選択"}
              texts={[
                { id: "産毛", name: "産毛のように薄い毛" },
                { id: "標準", name: "どちらとも言えない毛" },
                { id: "太い", name: "濃くしっかりと生えた毛" },
                // { id: "未選択", name: "未選択" },
              ]}
              onClick={(idName: IdAndNameDto) =>
                setOrderData({ ...orderData, hair: idName })
              }
            />
            <OptionConditionBox
              orderData={orderData}
              onChange={(orderData: OrderPlanIdName) => setOrderData(orderData)}
            />
            <ConditionText
              title={OrderPlanTitle.card}
              orderData={orderData.card.id}
              texts={[
                { id: "none", name: "指定なし" },
                { id: "OK", name: "可能" },
              ]}
              onClick={(idName: IdAndNameDto) =>
                setOrderData({ ...orderData, card: idName })
              }
            />
            <ConditionText
              title={OrderPlanTitle.loan}
              orderData={orderData.loan.id}
              texts={[
                { id: "none", name: "指定なし" },
                { id: "OK", name: "可能" },
              ]}
              onClick={(idName: IdAndNameDto) =>
                setOrderData({ ...orderData, loan: idName })
              }
            />
          </Box>
        </UnderLineItemBox>
      </Box>
      <Box>
        <UnderLineItemBox title="表示" fontSize="1.5em">
          <Text mb=".7em" fontSize={"1.2em"}>
            表示形式を選択してください
          </Text>
          {/* <ConditionText
              title={OrderPlanTitle.paySystem}
              orderData={orderData.paySystem.id}
              texts={[
                { id: "総額", name: "総額" },
                { id: "１回分", name: "１回分" },
              ]}
              onClick={(idName:IdAndNameDto) =>
                setOrderData({ ...orderData, paySystem:idName})
              }
            /> */}
          <PlanHeadingBox title="並べ替え">
            <Text>料金</Text>
            <Box>
              <PlanSortSelect
                idName={orderData.sort}
                onChange={(idName: IdAndNameDto) =>
                  setOrderData({
                    ...orderData,
                    sort: idName,
                  })
                }
              />
            </Box>
          </PlanHeadingBox>
        </UnderLineItemBox>
      </Box>
      <Flex
        py={"1em"}
        pos="sticky"
        bottom={"0"}
        bg="originWhite"
        alignItems={"center"}
        justifyContent="center"
      >
        {/* <Text fontSize={"1.2em"}>閉じる</Text> */}
        <Button
          w={"40%"}
          variant={"base"}
          size={"md"}
          onClick={onClickSearchPlan}
        >
          検索
        </Button>
      </Flex>
    </Stack>
  );
};
