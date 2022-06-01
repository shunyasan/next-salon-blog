import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, HStack, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { NarrowImageAndTextBox } from "components/molecules/box/NarrowImageAndTextBox";
import { QueryKey } from "enums/QueryKey";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import fetcher from "services/api/fetcher";
import useSWR from "swr";
import { AboutCategory } from "types/api/AboutCategory";
import { QueryOrderPlan } from "types/app/QueryOrderPlan";
import style from "../../../../styles/Home.module.css";

type Props = {
  setAboutPartsSelectData: (data: any) => void;
  orderPlan: QueryOrderPlan;
};

export const AboutPartsSelectCard: FC<Props> = (props) => {
  const { setAboutPartsSelectData, orderPlan } = props;
  const [change, setChange] = useState<string>(style.fade);
  const [selected, setSelected] = useState<string>("");
  // const [aboutParts, setAboutParts] = useState<AboutCategory[]>([]);

  const { data: aboutParts, error: err_abo } = useSWR<AboutCategory[]>(
    `/api/about-categories/originId/${orderPlan.originParts}`,
    fetcher
  );

  const selectAboutPartsSelect = useCallback(
    (data: string) => {
      const param = `${QueryKey.aboutCategory}=${data}&`;
      setAboutPartsSelectData(param);
      setSelected(data);
    },
    [setAboutPartsSelectData]
  );

  // const getAboutParts = useCallback(async () => {
  //   if (orderPlan.originParts) {
  //     const res = await getAboutCategoryByOriginId(orderPlan.originParts);
  //     setAboutParts(res);
  //   }
  // }, [getAboutCategoryByOriginId, orderPlan]);

  // useEffect(() => {
  //   console.log("abo");
  //   console.log(orderPlan.originParts);
  //   console.log(aboutParts);
  // }, [orderPlan, aboutParts]);

  return (
    <div className={change}>
      <Box m={6} textAlign="center">
        <Box>脱毛したい部位カテゴリを選択してください</Box>
        <HStack justifyContent={"center"} wrap={"wrap"} my="1.5rem">
          {/* <Wrap my={4} spacing="1rem" justify="center"> */}
          {aboutParts?.map((data) => (
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
