import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import {
  Box,
  Center,
  HStack,
  Text,
  Stack,
  Flex,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { PlanTextBox } from "components/atoms/text/PlanText";
import { QueryKey } from "enums/QueryKey";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import style from "../../../../styles/Home.module.css";

type Props = {
  setQueryData: (data: string) => void;
};

export const PlanSearchCard: FC<Props> = (props) => {
  const [change, setChange] = useState<string>(style.fade);
  const [selecteCard, setSelecteCard] = useState<string>("none");
  const [selecteLoan, setSelecteLoan] = useState<string>("none");
  const [selecteContract, setSelecteContract] = useState<string>("none");
  const [selecteFreeOption, setSelecteFreeOption] = useState<string[]>([]);
  //   const [selecteFreeOption, setSelecteFreeOption] = useState<SelectFreeOption>({
  //   irradiationLeakage: false,
  //   aftercare: false,
  //   anesthesia: false,
  //   firstVisitFees: false,
  //   subsequentVisitFees: false,
  //   shaving: false,
  //   troubleTreatment: false,
  // });

  const { setQueryData } = props;

  const createQuery = useCallback(() => {
    const card = `${QueryKey.card}=${selecteCard}&`;
    const loan = `${QueryKey.loan}=${selecteLoan}&`;
    const contract = `${QueryKey.contract}=${selecteContract}&`;
    const option = `${QueryKey.option}=${selecteFreeOption}&`;
    setQueryData(card + loan + option + contract);
  }, [
    selecteCard,
    selecteLoan,
    setQueryData,
    selecteContract,
    selecteFreeOption,
  ]);

  return (
    <>
      <div className={change ? change : ""}>
        <Box m={6} textAlign="center">
          <Text>
            希望するオプションサービス・契約の特徴について教えてください
          </Text>
          <Stack spacing={"2rem"} mt={"2rem"}>
            {/* <Text>無料オプションサービスを選択してください</Text>
            <Box>
              <Flex
                wrap={"wrap"}
                justifyContent={"space-between"}
                w={"30rem"}
                mx={"auto"}
              >
                <FreeOptionCheckBox
                  onChange={(values) => setSelecteFreeOption(values)}
                />
              </Flex>
            </Box> */}
            <Box>
              <Box>カード利用の可否を選択してください</Box>
              <HStack justifyContent={"center"} wrap={"wrap"}>
                <PlanTextBox
                  targetValue={selecteCard}
                  value={"希望なし"}
                  id={"none"}
                  onClick={() => setSelecteCard("none")}
                />
                <PlanTextBox
                  targetValue={selecteCard}
                  value={"カード可"}
                  id={"OK"}
                  onClick={() => setSelecteCard("OK")}
                />
              </HStack>
            </Box>
            <Box>
              <Box>医療ローンの可否を選択してください</Box>
              <HStack justifyContent={"center"} wrap={"wrap"}>
                <PlanTextBox
                  targetValue={selecteLoan}
                  value={"希望なし"}
                  id={"none"}
                  onClick={() => setSelecteLoan("none")}
                />
                <PlanTextBox
                  targetValue={selecteLoan}
                  value={"医療ローン可"}
                  id={"OK"}
                  onClick={() => setSelecteLoan("OK")}
                />
              </HStack>
            </Box>
            <Box>
              <Box>解約の可否を選択してください</Box>
              <HStack justifyContent={"center"} wrap={"wrap"}>
                <PlanTextBox
                  targetValue={selecteContract}
                  value={"希望なし"}
                  id={"none"}
                  onClick={() => setSelecteContract("none")}
                />
                <PlanTextBox
                  targetValue={selecteContract}
                  value={"解約可"}
                  id={"OK"}
                  onClick={() => setSelecteContract("OK")}
                />
              </HStack>
            </Box>
          </Stack>
        </Box>
        <Center>
          <Button onClick={createQuery} variant={"base"}>
            次へ
          </Button>
        </Center>
      </div>
    </>
  );
};
