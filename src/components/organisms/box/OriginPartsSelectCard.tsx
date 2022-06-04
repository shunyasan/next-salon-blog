import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, HStack, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { NarrowImageAndTextBox } from "components/molecules/box/NarrowImageAndTextBox";
import { QueryKey } from "enums/QueryKey";
import getAllOriginCategory from "pages/api/origin-category";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import fetcher from "services/orm/fetcher";
import useSWR from "swr";
import { OriginCategory } from "types/api/OriginCategory";
import { QueryOrderPlan } from "types/app/QueryOrderPlan";
import style from "../../../../styles/Home.module.css";

type Props = {
  setOriginPartsSelectData: (data: any) => void;
  orderPlan: QueryOrderPlan;
};

export const OriginPartsSelectCard: FC<Props> = (props) => {
  const { setOriginPartsSelectData, orderPlan } = props;
  const [change, setChange] = useState<string>(style.fade);
  const [selected, setSelected] = useState<string>("");
  // const [originParts, setOriginParts] = useState<OriginCategory[]>([]);

  const { data: originParts, error: err_ori } = useSWR<OriginCategory[]>(
    `/api/origin-category`,
    fetcher
  );

  const selectAboutPartsSelect = (data: string) => {
    const param = `${QueryKey.originParts}=${data}&`;
    setOriginPartsSelectData(param);
    setSelected(data);
  };

  // const getOriginParts = useCallback(async () => {
  //   const originCategory = await getAllOriginCategory();
  //   setOriginParts(originCategory);
  // }, []);

  // useEffect(() => {
  //   getOriginParts();
  // }, [getOriginParts]);

  return (
    <div className={change}>
      <Box m={6} textAlign="center">
        <Box>脱毛したい部位カテゴリを選択してください</Box>
        <HStack justifyContent={"center"} wrap={"wrap"} my="1.5rem">
          {originParts?.map((data) => (
            <NarrowImageAndTextBox
              key={data.id}
              targetValue={selected}
              value={data.name}
              img={
                orderPlan.gender === "男性" ? data.imgUrlMen : data.imgUrlLady
              }
              id={data.id}
              onClick={() => selectAboutPartsSelect(data.id)}
            />
          ))}
        </HStack>
      </Box>
    </div>
  );
};
