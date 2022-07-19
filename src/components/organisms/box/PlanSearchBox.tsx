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
import { AboutCategory, BaseParts, OriginCategory } from "@prisma/client";
import { OrderPlanQueryService } from "services/orderPlanQueryService";
import { PlanSortBox } from "components/molecules/box/PlanSortBox";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";

type Props = {
  orderPlan: OrderPlanIdName;
  originCategories: OriginCategory[];
  aboutCategories: AboutCategory[];
  baseParts: BaseParts[];
  onClose?: () => void;
};

const { createParameter } = OrderPlanQueryService();

export const PlanSearchBox: FC<Props> = (props) => {
  const { orderPlan, originCategories, aboutCategories, baseParts, onClose } =
    props;
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderPlanIdName>(orderPlan);

  const onClickSearchPlan = async () => {
    if (orderData) {
      const query = createParameter(orderData);
      onClose && onClose();
      // resetPages();
      setLoading(true);
      router.push({
        pathname: "/plan/search/1",
        query: query,
      });
    }
  };

  // 全ての要素をchildrenにしてコンポーネントをまとめる
  return (
    <Stack m={"auto"} textAlign={"center"} spacing={"3em"} fontSize={"0.9em"}>
      {loading && <LoadingIcon />}
      <Box>
        <UnderLineItemBox title="自分" fontSize="1.5em">
          <Text fontSize={"1.2em"}>
            脱毛を考えている箇所について選択してください
          </Text>
          <Box mt=".7em">
            <ConditionText
              title={OrderPlanTitle.gender}
              orderData={orderData.gender.id}
              texts={[
                { id: "女性", text: "女性" },
                { id: "男性", text: "男性" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, gender: { id, name } })
              }
            />

            <ConditionPartsBox
              title="部位"
              orderPlan={orderData}
              originCategories={originCategories}
              aboutCategories={aboutCategories}
              baseParts={baseParts}
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
            <ConditionText
              title={OrderPlanTitle.skinCollor}
              orderData={orderData.skinCollor.id || "未選択"}
              texts={[
                { id: "白色", text: "色白い" },
                { id: "薄茶色", text: "平均的な肌色" },
                { id: "色黒", text: "日焼け肌" },
                // { id: "未選択", text: "未選択" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, skinCollor: { id, name } })
              }
            />
            <ConditionText
              title={OrderPlanTitle.hair}
              orderData={orderData.hair.id || "未選択"}
              texts={[
                { id: "産毛", text: "産毛のように薄い毛" },
                { id: "標準", text: "どちらとも言えない毛" },
                { id: "太い", text: "濃くしっかりと生えた毛" },
                // { id: "未選択", text: "未選択" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, hair: { id, name } })
              }
            />
          </Box>
        </UnderLineItemBox>
      </Box>
      <Box>
        <UnderLineItemBox title="クリニック" fontSize="1.5em">
          <Text fontSize={"1.2em"}>
            どのようなクリニックで施術を受けたいか選択してください
          </Text>
          <Box mt=".7em">
            <ConditionText
              title={OrderPlanTitle.roomType}
              orderData={orderData.roomType.id}
              texts={[
                { id: "none", text: "こだわらない" },
                { id: "個室", text: "個室" },
                { id: "完全個室", text: "完全個室" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, roomType: { id, name } })
              }
            />
            <ConditionText
              title={OrderPlanTitle.interior}
              orderData={orderData.interior.id}
              texts={[
                { id: "none", text: "こだわらない" },
                { id: "標準", text: "標準" },
                { id: "綺麗", text: "綺麗" },
                { id: "豪華", text: "豪華" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, interior: { id, name } })
              }
            />
            <ConditionText
              title={OrderPlanTitle.staff}
              orderData={orderData.staff.id}
              texts={[
                { id: "none", text: "こだわらない" },
                { id: "女性", text: "女性" },
                { id: "男性", text: "男性" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, staff: { id, name } })
              }
            />
          </Box>
        </UnderLineItemBox>
      </Box>
      <Box>
        <UnderLineItemBox title="プラン" fontSize="1.5em">
          <Text fontSize={"1.2em"}>支払い方法・その他を選択してください</Text>
          <Box mt=".7em">
            <ConditionText
              title={OrderPlanTitle.card}
              orderData={orderData.card.id}
              texts={[
                { id: "none", text: "こだわらない" },
                { id: "OK", text: "可能" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, card: { id, name } })
              }
            />
            <ConditionText
              title={OrderPlanTitle.loan}
              orderData={orderData.loan.id}
              texts={[
                { id: "none", text: "こだわらない" },
                { id: "OK", text: "可能" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, loan: { id, name } })
              }
            />
            <ConditionText
              title={OrderPlanTitle.contract}
              orderData={orderData.contract.id}
              texts={[
                { id: "none", text: "こだわらない" },
                { id: "OK", text: "可能" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, contract: { id, name } })
              }
            />
          </Box>
        </UnderLineItemBox>
      </Box>
      <Box>
        <UnderLineItemBox title="表示" fontSize="1.5em">
          <Text fontSize={"1.2em"}>表示形式を選択してください</Text>
          <Box mt=".7em">
            <ConditionText
              title={OrderPlanTitle.paySystem}
              orderData={orderData.paySystem.id}
              texts={[
                { id: "総額", text: "総額" },
                { id: "１回分", text: "１回分" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, paySystem: { id, name } })
              }
            />
            <PlanSortBox
              orderData={orderData.sort}
              onChange={(idName: IdAndNameDto) =>
                setOrderData({
                  ...orderData,
                  sort: idName,
                })
              }
            />
          </Box>
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
