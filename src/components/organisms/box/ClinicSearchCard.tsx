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
} from "@chakra-ui/react";
import { PlanTextBox } from "components/atoms/text/PlanText";
import { ImageAndTextBox } from "components/molecules/box/ImageAndTextBox";
import { QueryKey } from "enums/QueryKey";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import style from "../../../../styles/Home.module.css";
import { ClinicResource } from "../../../../resorces/ClinicResource";
import { HairResource } from "../../../../resorces/HairResource";
import { SkinResource } from "../../../../resorces/SkinResource";
import { TopResource } from "../../../../resorces/TopResource";

type Props = {
  setQueryData: (data: string) => void;
};

export const ClinicSearchCard: FC<Props> = (props) => {
  const [change, setChange] = useState<string>(style.fade);
  const [selecteRoomType, setSelecteRoomType] = useState<string>("none");
  const [selecteInterior, setSelecteInterior] = useState<string>("綺麗");
  const [selecteStaff, setSelecteStaff] = useState<number>(0);

  const { setQueryData } = props;

  const createQuery = useCallback(() => {
    const room = `${QueryKey.roomType}=${selecteRoomType}&`;
    const interior = `${QueryKey.interior}=${selecteInterior}&`;
    const staff = `${QueryKey.staff}=${selecteStaff}&`;
    setQueryData(room + interior + staff);
  }, [selecteRoomType, selecteInterior, selecteStaff, setQueryData]);

  return (
    <>
      <div className={change ? change : ""}>
        <Box m={6} textAlign="center">
          <Text>希望するクリニックの特徴について教えてください</Text>
          <Stack spacing={"2rem"} mt={"2rem"}>
            <Box>
              <Text>施術室のタイプを選択してください</Text>
              <HStack wrap={"wrap"} justifyContent={"center"}>
                <PlanTextBox
                  targetValue={selecteRoomType}
                  id={"none"}
                  value={"希望なし"}
                  onClick={() => setSelecteRoomType("none")}
                />
                <PlanTextBox
                  targetValue={selecteRoomType}
                  id={"個室"}
                  value={"個室"}
                  onClick={() => setSelecteRoomType("個室")}
                />
                <PlanTextBox
                  targetValue={selecteRoomType}
                  id={"完全個室"}
                  value={"完全個室"}
                  onClick={() => setSelecteRoomType("完全個室")}
                />
              </HStack>
            </Box>
            <Box>
              <Box>内装イメージを選択してください</Box>
              <HStack justifyContent={"center"} wrap={"wrap"}>
                <PlanTextBox
                  targetValue={selecteInterior}
                  id={"none"}
                  value={"希望なし"}
                  onClick={() => setSelecteInterior("none")}
                />
                <ImageAndTextBox
                  targetValue={selecteInterior}
                  value={"標準"}
                  img={ClinicResource.nomalClinic}
                  onClick={() => setSelecteInterior("標準")}
                />
                <ImageAndTextBox
                  targetValue={selecteInterior}
                  value={"綺麗"}
                  img={TopResource.clinicImg}
                  onClick={() => setSelecteInterior("綺麗")}
                />
                <ImageAndTextBox
                  targetValue={selecteInterior}
                  value={"豪華"}
                  img={ClinicResource.luxuryClinic}
                  onClick={() => setSelecteInterior("豪華")}
                />
              </HStack>
            </Box>
            <Box>
              <Box>施術者の性別を選択してください</Box>
              {/*  省くNo.を入力 (DB 1:女性 2:男性 3:女性男性) */}
              <HStack justifyContent={"center"} wrap={"wrap"}>
                <PlanTextBox
                  targetValue={selecteStaff}
                  id={0}
                  value={"希望なし"}
                  onClick={() => setSelecteStaff(0)}
                />
                <PlanTextBox
                  targetValue={selecteStaff}
                  id={2}
                  value={"女性"}
                  onClick={() => setSelecteStaff(2)}
                />
                <PlanTextBox
                  targetValue={selecteStaff}
                  id={1}
                  value={"男性"}
                  onClick={() => setSelecteStaff(1)}
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
