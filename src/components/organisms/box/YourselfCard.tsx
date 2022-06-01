import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, HStack, Text, Stack, Flex } from "@chakra-ui/react";
import { ImageAndTextBox } from "components/molecules/box/ImageAndTextBox";
import { QueryKey } from "enums/QueryKey";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import style from "../../../../styles/Home.module.css";
import { HairResource } from "../../../../resorces/HairResource";
import { SkinResource } from "../../../../resorces/SkinResource";

type Props = {
  setQueryData: (data: string) => void;
};

export const YourselfCard: FC<Props> = (props) => {
  const [change, setChange] = useState<string>(style.fade);
  const [selecteSkin, setSelecteSkin] = useState<string>("薄茶色");
  const [selecteHair, setSelecteHair] = useState<string>("標準");
  const [selectePay, setSelectePay] = useState<string>("総額");

  const { setQueryData } = props;

  const createQuery = useCallback(() => {
    const skin = `${QueryKey.skinCollor}=${selecteSkin}&`;
    const hair = `${QueryKey.hair}=${selecteHair}&`;
    const pay = `${QueryKey.paySystem}=${selectePay}&`;
    setQueryData(skin + hair + pay);
  }, [selecteSkin, selecteHair, selectePay, setQueryData]);

  return (
    <>
      <div className={change ? change : ""}>
        <Box m={6} textAlign="center">
          <Text>あなたの特徴について教えてください</Text>
          <Stack spacing={"2rem"} mt={"2rem"}>
            <Box>
              <Text>自身の肌の色を選択してください</Text>
              <HStack wrap={"wrap"} justifyContent={"center"}>
                <ImageAndTextBox
                  targetValue={selecteSkin}
                  value={"白色"}
                  img={SkinResource.whiteImg}
                  onClick={() => setSelecteSkin("白色")}
                />
                <ImageAndTextBox
                  targetValue={selecteSkin}
                  value={"薄茶色"}
                  img={SkinResource.baigeImg}
                  onClick={() => setSelecteSkin("薄茶色")}
                />
                <ImageAndTextBox
                  targetValue={selecteSkin}
                  value={"色黒"}
                  img={SkinResource.darkImg}
                  onClick={() => setSelecteSkin("色黒")}
                />
              </HStack>
            </Box>
            <Box>
              <Box>脱毛をする箇所の毛量を選択してください</Box>
              <HStack justifyContent={"center"} wrap={"wrap"}>
                <ImageAndTextBox
                  targetValue={selecteHair}
                  value={"細い（産毛）"}
                  img={HairResource.softHair}
                  onClick={() => setSelecteHair("産毛")}
                  id={"産毛"}
                />
                <ImageAndTextBox
                  targetValue={selecteHair}
                  value={"標準"}
                  img={HairResource.standardHair}
                  onClick={() => setSelecteHair("標準")}
                />
                <ImageAndTextBox
                  targetValue={selecteHair}
                  value={"太い"}
                  img={HairResource.hardHair}
                  onClick={() => setSelecteHair("太い")}
                />
              </HStack>
            </Box>
            <Box>
              <Box>どちらの料金を重視するか選択してください</Box>
              <HStack justifyContent={"center"} wrap={"wrap"}>
                <HStack
                  w="18rem"
                  h={"12rem"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  shadow={selectePay === "総額" ? "0 0 3px 2px #888" : "md"}
                  cursor="pointer"
                  py="0.5rem"
                  m={{ md: "2rem !important", sm: "1rem !important" }}
                  onClick={() => setSelectePay("総額")}
                >
                  <Text>施術の</Text>
                  <Text fontSize={"2rem"}>総額</Text>
                  <Text>を重視</Text>
                </HStack>
                <HStack
                  w="18rem"
                  h={"12rem"}
                  shadow={selectePay === "１回分" ? "0 0 3px 2px #888" : "md"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  cursor="pointer"
                  py="0.5rem"
                  m={{ md: "2rem !important", sm: "1rem !important" }}
                  onClick={() => setSelectePay("１回分")}
                >
                  <Text>施術の</Text>
                  <Text fontSize={"2rem"}>１回分</Text>
                  <Text>を重視</Text>
                </HStack>
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
