import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Clinic } from "@prisma/client";
import { StatusText } from "components/atoms/text/StatusText";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import { titleValueService } from "services/titleValueService";
import { TitleValue } from "types/TitleValue";
type Props = {
  clinic: Clinic;
};

const { newOptionFunc } = titleValueService();

export const PayRerationsBoxList: FC<Props> = (props) => {
  const { clinic } = props;
  const [payment, setPayment] = useState<TitleValue[]>([]);

  const OptionFunc = useCallback(async () => {
    const pay = newOptionFunc(clinic);
    setPayment(pay);
  }, [clinic]);

  useEffect(() => {
    OptionFunc();
  }, [OptionFunc]);

  return (
    <Flex wrap={"wrap"} justifyContent={"left"}>
      {payment.map((data, i) => (
        <Flex
          key={i}
          w={"50%"}
          my="0.2rem"
          // h={"4rem"}
          justifyContent={"left"}
          // spacing={"3px"}
          fontSize={data.title !== "-" ? "0.8em" : "0.8em"}
          // onClick={onClick}
          // mx={"auto"}
          // cursor={"pointer"}
        >
          <Text
            w="5em"
            fontWeight={data.title !== "-" ? "bold" : ""}
            flexShrink="0"
          >
            {data.title}
          </Text>
          <Box ml="1rem" display={"inline-block"}>
            <StatusText text={data.value} first={""} second={""} other={"-"} />
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};
