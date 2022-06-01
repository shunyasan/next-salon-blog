import { Button } from "@chakra-ui/button";
import { Box, Center, Text, HStack } from "@chakra-ui/layout";
import { QueryKey } from "enums/QueryKey";
import { FC, memo, useCallback, useState } from "react";

type Props = {
  selectParamsData: (data: any) => void;
};

export const PriceViewCard: FC<Props> = (props) => {
  const [change, setChange] = useState<string>("fade");
  const [selected, setSelected] = useState<string>("");
  const { selectParamsData } = props;

  const selectItem = useCallback(
    (data: string) => {
      const param = `${QueryKey.paySystem}=${data}&`;
      selectParamsData(param);
      setSelected(data);
    },
    [selectParamsData]
  );

  return (
    <div className={change ? change : ""}>
      <Box m={6} textAlign="center">
        <Box>料金の表示タイプを選択してください</Box>
        <HStack justifyContent={"center"} wrap={"wrap"} my="1.5rem">
          <Box
            w="18rem"
            shadow="0 0 2px 2px #777"
            cursor="pointer"
            py="0.5rem"
            m={{ md: "2rem !important", sm: "1rem !important" }}
            onClick={() => selectItem("総額")}
            bg={selected === "総額" ? "#aaa" : ""}
          >
            <Text as={"a"}>施術の</Text>
            <Text as={"a"} fontSize={"2rem"}>
              総額
            </Text>
            <Text as={"a"}>から考える</Text>
          </Box>
          <Box
            w="18rem"
            shadow="0 0 2px 2px #777"
            cursor="pointer"
            py="0.5rem"
            m={{ md: "2rem !important", sm: "1rem !important" }}
            onClick={() => selectItem("１回分")}
            bg={selected === "１回分" ? "#aaa" : ""}
          >
            <Text as={"a"}>施術の</Text>
            <Text as={"a"} fontSize={"2rem"}>
              １回分
            </Text>
            <Text as={"a"}>から考える</Text>
          </Box>
        </HStack>
      </Box>
    </div>
  );
};
