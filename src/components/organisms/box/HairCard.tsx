import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, HStack, Text } from "@chakra-ui/layout";
import { ImageAndTextBox } from "components/molecules/box/ImageAndTextBox";
import { QueryKey } from "enums/QueryKey";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import style from "../../../../Home.module.css";
import { HairResource } from "../../../../resorces/HairResource";

type Props = {
  setHairData: (data: string) => void;
};

export const HairCard: FC<Props> = (props) => {
  const [change, setChange] = useState<string>(style.fade);
  const [selected, setSelected] = useState<string>("");

  const { setHairData } = props;

  const selectProps = useCallback(
    (data: string) => {
      const param = `${QueryKey.hair}=${data}&`;
      setHairData(param);
      setSelected(data);
    },
    [setHairData]
  );

  return (
    <>
      <div className={change ? change : ""}>
        <Box m={6} textAlign="center">
          <Box>脱毛をする箇所の毛量を選択</Box>
          <HStack justifyContent={"center"} wrap={"wrap"} my="1.5rem">
            <ImageAndTextBox
              targetValue={selected}
              value={"細い（産毛）"}
              img={HairResource.softHair}
              onClick={() => selectProps("産毛")}
              id={"産毛"}
            />
            <ImageAndTextBox
              targetValue={selected}
              value={"標準"}
              img={HairResource.standardHair}
              onClick={() => selectProps("標準")}
            />
            <ImageAndTextBox
              targetValue={selected}
              value={"太い"}
              img={HairResource.hardHair}
              onClick={() => selectProps("太い")}
            />
          </HStack>
        </Box>
      </div>
    </>
  );
};
