import { FC } from "react";
import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { PriceDto } from "types/PriceDto";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";

type Props = {
  price: PriceDto;
  orderDataIdName: OrderPlanIdName;
};

export const PriceDataBox: FC<Props> = (props) => {
  const { price, orderDataIdName } = props;
  return (
    <Stack
      spacing={".5em"}
      border="1px"
      shadow={"md"}
      borderColor={"originGray"}
      p="0.5em"
    >
      <Text fontWeight={"bold"}>{price.name}</Text>
      <Flex justifyContent={"center"} alignItems={"flex-end"}>
        <Text pb="1.2em" fontSize={"0.4rem"}>
          {price.clinic.tax || "不明"}
        </Text>
        {orderDataIdName.paySystem.id !== "総額" ? (
          <>
            <Text fontSize={{ md: "1.8rem", sm: "1.5rem" }}>
              ￥{price.oncePrice.toLocaleString()}
            </Text>
            <Text>/回</Text>
          </>
        ) : (
          <>
            <Text fontSize={{ md: "1.8rem", sm: "1.5rem" }}>
              ￥{price.price.toLocaleString()}
            </Text>
            {/* <Text >({price.times}回)</Text> */}
          </>
        )}
      </Flex>
      <Flex fontSize={"0.8em"} justifyContent={"space-evenly"}>
        <HStack>
          {orderDataIdName.paySystem.id !== "総額" ? (
            <>
              <Text fontWeight={"bold"}>総額</Text>
              <Text>￥{price.price.toLocaleString()}</Text>
              {/* <Text >({price.times}回)</Text> */}
            </>
          ) : (
            <>
              <Text fontWeight={"bold"}>1回分</Text>
              <Text>￥{price.oncePrice.toLocaleString()}</Text>
            </>
          )}
        </HStack>
        <HStack>
          <Text fontWeight={"bold"}>回数</Text>
          <Text>{price.times}回</Text>
        </HStack>
      </Flex>
    </Stack>
  );
};
