import { Box, Center, Flex, HStack, Text, Stack } from "@chakra-ui/layout";
import { Button, Checkbox, Icon } from "@chakra-ui/react";
import { Machine } from "@prisma/client";
import { LoadingModalIcon } from "components/atoms/icons/LoadingModalIcon";
import { ChangeBgTab } from "components/atoms/tab/ChangeBgTab";
import { ConditionText } from "components/molecules/box/ConditionTextBox";
import { MachineCheckBox } from "components/molecules/checkBox/MachineCheckBox";
import { OrderPlanTitle } from "enums/OrderPlanTitle";
import Image from "next/image";
import React, { FC, useCallback, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import fetcher from "services/common/fetcher";
import { idAndNameService } from "services/idAndNameService";
import useSWR from "swr";
import { IdAndNameDto } from "types/IdAndNameDto";
import { TopResource } from "../../../../resorces/TopResource";

type Props = {
  // partsクリック時にデータを受け取る
  onClick: (machineIds: IdAndNameDto[]) => void;
  isOpen: boolean;
  onClose: () => void;
};

const tab = ["機器を選ぶ", "肌の特徴から選ぶ"];

const skin = [
  { id: "1", name: "色白い" },
  { id: "2", name: "平均的な肌色" },
  { id: "3", name: "日焼け肌" },
];

const hair = [
  { id: "soft", name: "産毛のように薄い毛" },
  { id: "standerd", name: "どちらとも言えない毛" },
  { id: "hard", name: "濃くしっかりと生えた毛" },
];

const { serializeIdAndName } = idAndNameService();

const SelectMachineBox: FC<Props> = (props) => {
  const { onClick, isOpen, onClose } = props;

  const [selectTab, setSelectTab] = useState<string>(tab[0]);
  const [selectMachines, setSelectMachines] = useState<string[]>([]);
  const [selectOwn, setSelectOwn] = useState<{
    skin: IdAndNameDto;
    hair: IdAndNameDto;
  }>({ skin: skin[1], hair: hair[1] });

  const { data: machines, error: err_mac } = useSWR<Machine[]>(
    `/api/machine/id-and-name`,
    fetcher
  );

  const { data: machinesByOwn, error: err_own_mac } = useSWR<Machine[]>(
    `/api/machine/id-and-name/own-type?skinId=${selectOwn.skin.id}&hairId=${selectOwn.hair.id}`,
    fetcher
  );

  const onClickeMachine = useCallback(
    (machineId: string) => {
      const index = selectMachines.indexOf(machineId);
      if (index >= 0) {
        const array = selectMachines.filter((machine) => machine !== machineId);
        setSelectMachines(array);
      } else {
        setSelectMachines([...selectMachines, machineId]);
      }
    },
    [selectMachines]
  );

  const onClickSelected = useCallback(() => {
    const result = machines?.filter((machine) => {
      const index = selectMachines.indexOf(machine.id);
      return machines[index];
    });
    const idName: IdAndNameDto[] | undefined = result?.map((data) => {
      return serializeIdAndName(data.id, data.name);
    });

    onClick(idName || []);
    onClose();
  }, [machines, selectMachines, onClick, onClose]);

  if (!machines || !machinesByOwn) return <LoadingModalIcon />;
  return (
    <Box
      width="100%"
      height="100%"
      position="fixed"
      top="0"
      left="0"
      visibility={isOpen ? "visible" : "hidden"}
      zIndex="1000"
      bg="rgba(30,30,30,0.5)"
    >
      <Box
        px={{ md: "3em", sm: "1em" }}
        bg="originWhite"
        w={{ md: "80%", sm: "90%" }}
        h="90%"
        mx="auto"
        my="2rem"
        overflow={"scroll"}
        pos="relative"
      >
        <Icon
          pos="sticky"
          top="1rem"
          right={"0"}
          cursor={"pointer"}
          fontSize={"2.3em"}
          float={"right"}
          as={MdClose}
          onClick={onClose}
          bg="originWhite"
        />
        <Text my="2.5em">どちらから機器を探しますか？</Text>
        <Box mb={"2em"} textAlign="center" shadow={"lg"}>
          <Flex>
            {tab.map((data, i) => (
              <ChangeBgTab
                key={i}
                selectTab={selectTab}
                value={data}
                onClick={() => {
                  setSelectTab(data);
                  setSelectMachines([]);
                }}
              />
            ))}
          </Flex>
          <Flex
            py="2rem"
            wrap={"wrap"}
            justifyContent={"center"}
            display={selectTab === tab[0] ? "flex" : "none"}
          >
            {machines.map((value) => (
              <MachineCheckBox
                width={{ md: "13em", sm: "9em" }}
                height={{ md: "10em", sm: "7em" }}
                key={value.id}
                image={value.picture}
                alt={value.name}
                data={value}
                onClick={(machineId) => onClickeMachine(machineId)}
              />
            ))}
          </Flex>
          <Box
            py="2rem"
            justifyContent={"center"}
            display={selectTab === tab[1] ? "block" : "none"}
          >
            <Box w={"95%"} mx="auto">
              <Text my="1rem">肌の特徴を選択してください</Text>
              <ConditionText
                title={"肌の色"}
                orderData={selectOwn.skin.id}
                texts={skin}
                onClick={(idName: IdAndNameDto) => {
                  setSelectOwn({ ...selectOwn, skin: idName });
                  setSelectMachines([]);
                }}
              />
              <ConditionText
                title={"毛量"}
                orderData={selectOwn.hair.id}
                texts={hair}
                onClick={(idName: IdAndNameDto) => {
                  setSelectOwn({ ...selectOwn, hair: idName });
                  setSelectMachines([]);
                }}
              />
            </Box>
            <Stack mt="3rem">
              <Text>検索された機器</Text>
              <Text fontSize={".8em"}>※クリニックに確認をお願いします</Text>
            </Stack>
            <Flex my="2rem" wrap={"wrap"} justifyContent={"center"}>
              {machinesByOwn.map((value) => (
                <MachineCheckBox
                  key={value.id}
                  width={{ md: "13em", sm: "9em" }}
                  height={{ md: "10em", sm: "7em" }}
                  image={value.picture}
                  alt={value.name}
                  data={value}
                  onClick={(machineId) => onClickeMachine(machineId)}
                />
              ))}
            </Flex>
          </Box>
        </Box>
        <Button
          mt="2em"
          pos={"sticky"}
          bottom={"2rem"}
          variant={"base"}
          onClick={onClickSelected}
          outline={"solid 1px #888"}
        >
          {selectMachines.length > 0
            ? `選択する（${selectMachines.length}件）`
            : "指定なし"}
        </Button>
      </Box>
    </Box>
  );
};
export default SelectMachineBox;
