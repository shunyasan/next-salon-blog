import { Icon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Stack, Text } from "@chakra-ui/react";
import { ConditionText } from "components/molecules/box/ConditionTextBox";
import { useRouter } from "next/router";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import { createParameter } from "services/app/parameter/CreateParameterHooks";
import { IdAndNameDto } from "types/IdAndNameDto";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { OrderPlanEnum } from "enums/OrderPlanEnum";
import { UnderLineItemBox } from "components/molecules/box/UnderLineItemBox";
import { ConditionPartsBox } from "components/molecules/box/ConditionPartsBox";
import { AboutCategory, BaseParts, OriginCategory } from "@prisma/client";

type Props = {
  OrderPlan: OrderPlanIdName;
  originCategories: OriginCategory[];
  aboutCategories: AboutCategory[];
  baseParts: BaseParts[];
  onClose?: () => void;
};

export const PlanSearchBox: FC<Props> = (props) => {
  const { OrderPlan, originCategories, aboutCategories, baseParts, onClose } =
    props;
  const router = useRouter();

  const [orderData, setOrderData] = useState<OrderPlanIdName>(OrderPlan);
  // const [partsAndCategory, setPartsAndCategory] = useState<{
  //   originCategory: IdAndNameDto[];
  //   aboutCategory: IdAndNameDto[];
  //   parts: IdAndNameDto[];
  // }>();

  const onClickSearchPlan = async () => {
    if (orderData) {
      const param = createParameter(orderData);
      onClose && onClose();
      // resetPages();
      router.push({
        pathname: "/plan/search/1",
        search: `?${param}`,
      });
    }
  };

  // const getAllPartsAndCategory = useCallback(
  //   async (orderParams: OrderPlanIdName) => {
  //     const data = await getResearchCardData(
  //       orderParams.originParts.id,
  //       orderParams.AboutCategory.id,
  //       orderParams.parts?.id
  //     );
  //     setPartsAndCategory(data);
  //     setOrderData({
  //       ...orderParams,
  //       originParts: data.originCategory[0],
  //       AboutCategory: data.aboutCategory[0],
  //       parts: data.parts[0],
  //     });
  //     return data;
  //   },
  //   []
  // );

  // const checkNewAboutPartsData = (
  //   newOrderData: OrderPlanIdName,
  //   key: string,
  //   name: string,
  //   id: string
  // ) => {
  //   if (key === OrderPlanEnum.gender.name) {
  //     newOrderData.gender = { id, name };
  //   } else if (key === OrderPlanEnum.skinCollor.name) {
  //     newOrderData.skinCollor = { id, name };
  //   } else if (key === OrderPlanEnum.hair.name) {
  //     newOrderData.hair = { id, name };
  //   } else if (key === OrderPlanEnum.paySystem.name) {
  //     newOrderData.paySystem = { id, name };
  //   } else if (key === OrderPlanEnum.roomType.name) {
  //     newOrderData.roomType = { id, name };
  //   } else if (key === OrderPlanEnum.interior.name) {
  //     newOrderData.interior = { id, name };
  //   } else if (key === OrderPlanEnum.staff.name) {
  //     newOrderData.staff = { id, name };
  //   } else if (key === OrderPlanEnum.card.name) {
  //     newOrderData.card = { id, name };
  //   } else if (key === OrderPlanEnum.loan.name) {
  //     newOrderData.loan = { id, name };
  //   } else if (key === OrderPlanEnum.contract.name) {
  //     newOrderData.contract = { id, name };
  //   } else if (key === OrderPlanEnum.originCategory.name) {
  //     newOrderData.originParts = { id, name };
  //     newOrderData.AboutCategory = { id: "", name: "" };
  //     newOrderData.parts = { id: "", name: "" };
  //   } else if (key === OrderPlanEnum.aboutCategory.name) {
  //     newOrderData.AboutCategory = { id, name };
  //     newOrderData.parts = { id: "", name: "" };
  //   } else if (key === OrderPlanEnum.parts.name) {
  //     newOrderData.parts = { id, name };
  //   }
  //   return newOrderData;
  // };

  // const getSetOrderData = async (key: string, name: string, id: string) => {
  //   if (orderData) {
  //     const checkedParts: OrderPlanIdName = checkNewAboutPartsData(
  //       orderData,
  //       key,
  //       name,
  //       id
  //     );

  //     await getAllPartsAndCategory(checkedParts);
  //   }
  // };

  // useEffect(() => {
  //   getAllPartsAndCategory(OrderPlan);
  // }, [getAllPartsAndCategory, OrderPlan]);

  return (
    <Stack m={"auto"} textAlign={"center"} spacing={"3em"} fontSize={"0.9em"}>
      <Box>
        <Text fontSize={"1.2em"}>あなたの特徴について教えてください</Text>
        <UnderLineItemBox title="自分" fontSize="1.5em">
          <Box mt=".7em">
            <ConditionText
              title={OrderPlanEnum.gender.name}
              orderData={orderData.gender.id}
              texts={[
                { id: "女性", text: "女性" },
                { id: "男性", text: "男性" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, gender: { id, name } })
              }
            />
            <ConditionText
              title={OrderPlanEnum.paySystem.name}
              orderData={orderData.paySystem.id}
              texts={[
                { id: "総額", text: "総額" },
                { id: "１回分", text: "１回分" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, paySystem: { id, name } })
              }
            />
            <ConditionText
              title={OrderPlanEnum.skinCollor.name}
              orderData={orderData.skinCollor.id || "未選択"}
              texts={[
                { id: "白色", text: "白色" },
                { id: "薄茶色", text: "薄茶色" },
                { id: "色黒", text: "色黒" },
                { id: "未選択", text: "未選択" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, skinCollor: { id, name } })
              }
            />
            <ConditionText
              title={OrderPlanEnum.hair.name}
              orderData={orderData.hair.id || "未選択"}
              texts={[
                { id: "産毛", text: "産毛" },
                { id: "標準", text: "標準" },
                { id: "太い", text: "太い" },
                { id: "未選択", text: "未選択" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, hair: { id, name } })
              }
            />
          </Box>
        </UnderLineItemBox>
      </Box>
      <Box>
        <Text fontSize={"1.2em"}>施術したい部位を教えてください</Text>
        <UnderLineItemBox title="部位" fontSize="1.5em">
          <Box mt=".7em">
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
                  AboutCategory: about,
                  parts: parts,
                })
              }
            />
          </Box>
        </UnderLineItemBox>
      </Box>
      <Box>
        <Text fontSize={"1.2em"}>
          どのようなクリニックで施術を受けたいか教えてください
        </Text>
        <UnderLineItemBox title="クリニック" fontSize="1.5em">
          <Box mt=".7em">
            <ConditionText
              title={OrderPlanEnum.roomType.name}
              orderData={orderData.roomType.id}
              texts={[
                { id: "none", text: "希望なし" },
                { id: "個室", text: "個室" },
                { id: "完全個室", text: "完全個室" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, roomType: { id, name } })
              }
            />
            <ConditionText
              title={OrderPlanEnum.interior.name}
              orderData={orderData.interior.id}
              texts={[
                { id: "none", text: "希望なし" },
                { id: "標準", text: "標準" },
                { id: "綺麗", text: "綺麗" },
                { id: "豪華", text: "豪華" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, interior: { id, name } })
              }
            />
            <ConditionText
              title={OrderPlanEnum.staff.name}
              orderData={orderData.staff.name}
              texts={[
                { id: "希望なし", text: "希望なし" },
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
        <Text fontSize={"1.2em"}>プランの特徴を教えてください</Text>
        <UnderLineItemBox title="プラン" fontSize="1.5em">
          <Box mt=".7em">
            <ConditionText
              title={OrderPlanEnum.card.name}
              orderData={orderData.card.id}
              texts={[
                { id: "none", text: "希望なし" },
                { id: "OK", text: "カード可" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, card: { id, name } })
              }
            />
            <ConditionText
              title={OrderPlanEnum.loan.name}
              orderData={orderData.loan.id}
              texts={[
                { id: "none", text: "希望なし" },
                { id: "OK", text: "医療ローン可" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, loan: { id, name } })
              }
            />
            <ConditionText
              title={OrderPlanEnum.contract.name}
              orderData={orderData.contract.id}
              texts={[
                { id: "none", text: "希望なし" },
                { id: "OK", text: "解約可" },
              ]}
              onClick={(name: string, id: string) =>
                setOrderData({ ...orderData, contract: { id, name } })
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
