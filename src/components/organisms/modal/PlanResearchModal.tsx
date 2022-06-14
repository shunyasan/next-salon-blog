import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ConditionText } from "components/atoms/text/ConditionText";
import { useRouter } from "next/router";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import { useLocation } from "react-router-dom";
import { getResearchCardData } from "services/app/etc/etc";
import { createParameter } from "services/app/parameter/CreateParameterHooks";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { PartsSelectBox } from "../box/PartsSelectBox";

type Props = {
  OrderPlan: OrderPlanIdName;
  isOpen: boolean;
  onClose: () => void;
  resetPages: () => void;
};

export const PlanResearchModal: FC<Props> = (props) => {
  const { OrderPlan, isOpen, onClose, resetPages } = props;
  const router = useRouter();

  const [orderData, setOrderData] = useState<OrderPlanIdName>();
  const [partsAndCategory, setPartsAndCategory] = useState<{
    originCategory: IdAndNameDto[];
    aboutCategory: IdAndNameDto[];
    parts: IdAndNameDto[];
  }>();

  const getAllPartsAndCategory = useCallback(
    async (orderParams: OrderPlanIdName) => {
      const data = await getResearchCardData(
        orderParams.originParts.id,
        orderParams.AboutCategory.id,
        orderParams.parts?.id
      );
      setPartsAndCategory(data);
      setOrderData({
        ...orderParams,
        originParts: data.originCategory[0],
        AboutCategory: data.aboutCategory[0],
        parts: data.parts[0],
      });
      return data;
    },
    []
  );

  const checkNewAboutPartsData = (
    newOrderData: OrderPlanIdName,
    key: string,
    name: string,
    id: string
  ) => {
    if (key === "性別") {
      newOrderData.gender = { id, name };
    } else if (key === "肌色") {
      newOrderData.skinCollor = { id, name };
    } else if (key === "毛量") {
      newOrderData.hair = { id, name };
    } else if (key === "料金体系") {
      newOrderData.paySystem = { id, name };
    } else if (key === "施術室") {
      newOrderData.roomType = { id, name };
    } else if (key === "内装") {
      newOrderData.interior = { id, name };
    } else if (key === "施術者") {
      newOrderData.staff = { id, name };
    } else if (key === "カード払い") {
      newOrderData.card = { id, name };
    } else if (key === "医療ローン") {
      newOrderData.loan = { id, name };
    } else if (key === "解約") {
      newOrderData.contract = { id, name };
    } else if (key === "広域カテゴリ") {
      newOrderData.originParts = { id, name };
      newOrderData.AboutCategory = { id: "", name: "" };
      newOrderData.parts = { id: "", name: "" };
    } else if (key === "詳細カテゴリ") {
      newOrderData.AboutCategory = { id, name };
      newOrderData.parts = { id: "", name: "" };
    } else if (key === "部位") {
      newOrderData.parts = { id, name };
    }
    return newOrderData;
  };

  const getSetOrderData = async (key: string, name: string, id: string) => {
    if (orderData) {
      const checkedParts: OrderPlanIdName = checkNewAboutPartsData(
        orderData,
        key,
        name,
        id
      );

      await getAllPartsAndCategory(checkedParts);
    }
  };

  const researchPlan = async () => {
    if (orderData) {
      const param = createParameter(orderData);
      onClose();
      resetPages();
      router.push({
        pathname: "/plan/search",
        search: `?${param}`,
      });
    }
  };

  useEffect(() => {
    getAllPartsAndCategory(OrderPlan);
  }, [getAllPartsAndCategory, OrderPlan]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w={{ md: "inherit", sm: "90%" }}>
        <ModalCloseButton />
        <ModalBody p={{ md: "2rem", sm: "2rem 1rem" }}>
          <Stack
            m={"auto"}
            textAlign={"center"}
            spacing={"1rem"}
            fontSize={"0.8rem"}
          >
            {orderData && (
              <>
                <Text
                  w={{ md: "30%", sm: "38%" }}
                  bg={"originLiteGray"}
                  border={"1px"}
                  borderColor={"originBlack"}
                >
                  性別
                </Text>
                <ConditionText
                  orderData={orderData.gender.id}
                  texts={[
                    { id: "女性", text: "女性" },
                    { id: "男性", text: "男性" },
                  ]}
                  onClick={(name: string, id: string) =>
                    getSetOrderData("性別", name, id)
                  }
                />
                <Text
                  w={{ md: "30%", sm: "38%" }}
                  bg={"originLiteGray"}
                  border={"1px"}
                  borderColor={"originBlack"}
                >
                  部位
                </Text>
                {partsAndCategory && (
                  <>
                    <PartsSelectBox
                      title={"広域カテゴリ"}
                      data={partsAndCategory.originCategory}
                      noneValue={"希望なし"}
                      onChange={(name: string, id: string) =>
                        getSetOrderData("広域カテゴリ", name, id)
                      }
                    />
                    <PartsSelectBox
                      title={"詳細カテゴリ"}
                      data={partsAndCategory.aboutCategory}
                      noneValue={"希望なし"}
                      onChange={(name: string, id: string) =>
                        getSetOrderData("詳細カテゴリ", name, id)
                      }
                    />
                    <PartsSelectBox
                      title={"部位"}
                      data={partsAndCategory.parts}
                      noneValue={"希望なし"}
                      onChange={(name: string, id: string) =>
                        getSetOrderData("部位", name, id)
                      }
                    />
                  </>
                )}
                <Text
                  w={{ md: "30%", sm: "38%" }}
                  bg={"originLiteGray"}
                  border={"1px"}
                  borderColor={"originBlack"}
                >
                  自分
                </Text>
                <ConditionText
                  title={"料金体系"}
                  orderData={orderData.paySystem.id}
                  texts={[
                    { id: "総額", text: "総額" },
                    { id: "１回分", text: "１回分" },
                  ]}
                  onClick={(name: string, id: string) =>
                    getSetOrderData("料金体系", name, id)
                  }
                />
                <ConditionText
                  title={"肌色"}
                  orderData={orderData.skinCollor.id || "未選択"}
                  texts={[
                    { id: "白色", text: "白色" },
                    { id: "薄茶色", text: "薄茶色" },
                    { id: "色黒", text: "色黒" },
                    { id: "未選択", text: "未選択" },
                  ]}
                  onClick={(name: string, id: string) =>
                    getSetOrderData("肌色", name, id)
                  }
                />
                <ConditionText
                  title={"毛量"}
                  orderData={orderData.hair.id || "未選択"}
                  texts={[
                    { id: "産毛", text: "産毛" },
                    { id: "標準", text: "標準" },
                    { id: "太い", text: "太い" },
                    { id: "未選択", text: "未選択" },
                  ]}
                  onClick={(name: string, id: string) =>
                    getSetOrderData("毛量", name, id)
                  }
                />
                <Text
                  w={{ md: "30%", sm: "38%" }}
                  bg={"originLiteGray"}
                  border={"1px"}
                  borderColor={"originBlack"}
                >
                  クリニック
                </Text>
                <ConditionText
                  title={"施術室"}
                  orderData={orderData.roomType.id}
                  texts={[
                    { id: "none", text: "希望なし" },
                    { id: "個室", text: "個室" },
                    { id: "完全個室", text: "完全個室" },
                  ]}
                  onClick={(name: string, id: string) =>
                    getSetOrderData("施術室", name, id)
                  }
                />
                <ConditionText
                  title={"内装"}
                  orderData={orderData.interior.id}
                  texts={[
                    { id: "none", text: "希望なし" },
                    { id: "標準", text: "標準" },
                    { id: "綺麗", text: "綺麗" },
                    { id: "豪華", text: "豪華" },
                  ]}
                  onClick={(name: string, id: string) =>
                    getSetOrderData("内装", name, id)
                  }
                />
                <ConditionText
                  title={"施術者"}
                  orderData={orderData.staff.id.toString()}
                  texts={[
                    { id: "0", text: "希望なし" },
                    { id: "2", text: "女性" },
                    { id: "1", text: "男性" },
                  ]}
                  onClick={(name: string, id: string) =>
                    getSetOrderData("施術者", name, id)
                  }
                />
                <Text
                  w={{ md: "30%", sm: "38%" }}
                  bg={"originLiteGray"}
                  border={"1px"}
                  borderColor={"originBlack"}
                >
                  プラン
                </Text>
                <ConditionText
                  title={"カード払い"}
                  orderData={orderData.card.id}
                  texts={[
                    { id: "none", text: "希望なし" },
                    { id: "OK", text: "カード可" },
                  ]}
                  onClick={(name: string, id: string) =>
                    getSetOrderData("カード払い", name, id)
                  }
                />
                <ConditionText
                  title={"医療ローン"}
                  orderData={orderData.loan.id}
                  texts={[
                    { id: "none", text: "希望なし" },
                    { id: "OK", text: "医療ローン可" },
                  ]}
                  onClick={(name: string, id: string) =>
                    getSetOrderData("医療ローン", name, id)
                  }
                />
                <ConditionText
                  title={"コースの解約"}
                  orderData={orderData.contract.id}
                  texts={[
                    { id: "none", text: "希望なし" },
                    { id: "OK", text: "解約可" },
                  ]}
                  onClick={(name: string, id: string) =>
                    getSetOrderData("解約", name, id)
                  }
                />
              </>
            )}
          </Stack>
          <Center mt={"2rem"}>
            <Button
              w={"60%"}
              variant={"base"}
              size={"md"}
              onClick={researchPlan}
            >
              再検索
            </Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
