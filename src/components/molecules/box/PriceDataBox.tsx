import { FC } from "react";
import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { PriceDto } from "types/PriceDto";
import { OrderPlanIdName } from "types/OrderPlanIdName";
import { TitleValue } from "types/TitleValue";
import { defaultData } from "services/common/defaultData";

type Props = {
  price: PriceDto;
  orderDataIdName: OrderPlanIdName;
};

const { defaultSort } = defaultData();

export const PriceDataBox: FC<Props> = (props) => {
  const { price, orderDataIdName } = props;

  const selectFee = (sortId: string): TitleValue => {
    switch (sortId) {
      case defaultSort.oncePrice_asc.id:
      case defaultSort.oncePrice_desc.id:
        return { title: "1回分", value: price.oncePrice.toLocaleString() };
      case defaultSort.price_asc.id:
      case defaultSort.price_desc.id:
        return { title: "総額", value: price.price.toLocaleString() };
      default:
        return { title: "総額", value: price.price.toLocaleString() };
    }
  };

  const selectSubFee = (sortId: string): TitleValue => {
    switch (sortId) {
      case defaultSort.oncePrice_asc.id:
      case defaultSort.oncePrice_desc.id:
        return { title: "総額", value: price.price.toLocaleString() };
      case defaultSort.price_asc.id:
      case defaultSort.price_desc.id:
        return { title: "1回分", value: price.oncePrice.toLocaleString() };
      default:
        return { title: "1回分", value: price.oncePrice.toLocaleString() };
    }
  };

  return (
    <Stack
      spacing={".5em"}
      border="1px"
      shadow={"md"}
      borderColor={"originGray"}
      p="0.5em"
    >
      <HStack justifyContent={"center"}>
        <Text fontWeight={"bold"}>{price.name}</Text>
        <Text fontSize={".7em"}>{price.terms && `※ ${price.terms}`}</Text>
      </HStack>
      <Flex justifyContent={"center"} alignItems={"flex-end"}>
        <Text mr=".5em" pb=".5em" fontWeight={"bold"}>
          {selectFee(orderDataIdName.sort.id).title}
        </Text>
        <Text fontSize={{ md: "1.8rem", sm: "1.5rem" }}>
          ￥{selectFee(orderDataIdName.sort.id).value}
        </Text>
        <Text pb=".3em" fontSize={"0.6em"}>
          （{price.clinic.tax || "ー"}）
        </Text>
      </Flex>
      <Flex fontSize={"0.8em"} justifyContent={"space-evenly"}>
        <HStack>
          <Text fontWeight={"bold"}>
            {selectSubFee(orderDataIdName.sort.id).title}
          </Text>
          <Text>￥{selectSubFee(orderDataIdName.sort.id).value}</Text>
        </HStack>
        <HStack>
          <Text fontWeight={"bold"}>回数</Text>
          <Text>{price.times}回</Text>
        </HStack>
      </Flex>
    </Stack>
  );
};
