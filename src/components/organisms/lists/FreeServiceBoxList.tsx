import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Option } from "@prisma/client";
import { StatusText } from "components/atoms/text/StatusText";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import { titleValueService } from "services/titleValueService";
import { TitleValue } from "types/TitleValue";
type Props = {
  clinicOption: Option[];
};

const { ClinicOptionTitleValue } = titleValueService();

export const FreeServiceBoxList: FC<Props> = (props) => {
  const { clinicOption } = props;

  const [optionData, setOptionData] = useState<TitleValue[]>();

  const getOption = useCallback(() => {
    const data = ClinicOptionTitleValue(clinicOption);
    setOptionData(data);
  }, [clinicOption]);

  useEffect(() => {
    getOption();
  }, [getOption]);

  return (
    <Flex wrap={"wrap"} justifyContent={"left"}>
      {optionData &&
        optionData.map((data, i) => (
          <Flex
            key={i}
            w={"50%"}
            my="0.2rem"
            // h={"4rem"}
            justifyContent={"left"}
            // spacing={"3px"}
            fontSize={data.value !== "-" ? "0.8em" : "0.8em"}
            // onClick={onClick}
            // mx={"auto"}
            // cursor={"pointer"}
          >
            <Text
              whiteSpace={"nowrap"}
              fontWeight={data.value !== "-" ? "bold" : ""}
            >
              {data.title}
            </Text>
            {/* <Box
            borderBottom={"1px"}
            borderColor={"black"}
            w={"80%"}
            mx={"auto"}
          ></Box> */}
            <Box ml="1rem" display={"inline-block"}>
              <StatusText
                text={data.value}
                first={"無料"}
                second={data.value === "-" ? "" : data.value}
                other={"-"}
              />
            </Box>
          </Flex>
        ))}
    </Flex>
  );
};
