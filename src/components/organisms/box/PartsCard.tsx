import { Box, Stack, Text } from "@chakra-ui/layout";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import { Image } from "@chakra-ui/react";
import { QueryOrderPlan } from "types/app/QueryOrderPlan";
import getAboutCategoryById from "pages/api/about-categories/[id]";
import useSWR from "swr";
import { QueryKey } from "enums/QueryKey";
import getAllBasePartsIdAndName from "pages/api/id-and-name/about-category/[aboutCategoryId]";
import { PartsButton } from "components/atoms/button/PartsButton";
import fetcher from "services/api/fetcher";
import { AboutCategory } from "types/api/AboutCategory";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";

type Props = {
  setPartsData: (data: any) => void;
  orderPlan: QueryOrderPlan;
};

export const PartsCard: FC<Props> = (props) => {
  const { setPartsData, orderPlan } = props;
  const { data: AboutCategory, error: err_abo } = useSWR<AboutCategory>(
    `/api/about-categories/${orderPlan.AboutCategory}`,
    fetcher
  );
  const { data: parts, error: err_par } = useSWR<IdAndNameDto[]>(
    `/api/base-parts/${orderPlan.AboutCategory}`,
    fetcher
  );

  // こういうとこで使うらしい...でもSEO的にどうかorSEO必要としていないページなら問題ない
  // const { data, error } = useSWR('/api/user', fetcher)

  const [change, setChange] = useState<string>("fade");
  const [selected, setSelected] = useState<string>("");
  // const [parts, setParts] = useState<IdAndNameDto[]>([]);
  // const [AboutCategory, setAboutParts] = useState<AboutCategory>();

  //Partsリストの表示(state)
  // const [partsList, setPartsList] = useState<string[]>([]);

  const selectParts = (data: string) => {
    const param = `${QueryKey.parts}=${data}&`;
    setSelected(data);
    setPartsData(param);
  };

  // const getAboutPartsById = async () => {
  //   if (orderPlan.AboutCategory) {
  //     const res = await getAboutCategoryById(orderPlan.AboutCategory);
  //     if (res) {
  //       setAboutParts(res);
  //     }
  //   }
  // };

  // const getPartsById = useCallback(async () => {
  //   if (orderPlan.AboutCategory) {
  //     const res: IdAndNameDto[] = await getAllBasePartsIdAndName(
  //       orderPlan.AboutCategory
  //     );
  //     setParts(res);
  //   }
  // }, [getAllBasePartsIdAndName, orderPlan]);

  // useEffect(() => {
  //   getPartsById();
  //   getAboutPartsById();
  // }, [getPartsById, getAboutPartsById]);

  return (
    <div className={change ? change : ""}>
      <Box m={"1rem"} textAlign="center">
        <Box>脱毛したい部位を選択してください</Box>
        <Stack
          w={{ md: "65%", sm: "85%" }}
          mx={"auto"}
          my="1.5rem"
          justifyContent={"center"}
          wrap="wrap"
          spacing={"0"}
        >
          <Box w={"16rem"} m={"auto"}>
            <Image
              src={
                orderPlan.gender === "女性"
                  ? AboutCategory?.imgUrlLady
                  : AboutCategory?.imgUrlMen
              }
              alt="性別"
            />
            <Text p="1.5rem">{AboutCategory?.name}</Text>
          </Box>
          <Box>
            {parts?.map((data) => (
              <PartsButton
                key={data.id}
                text={data.name}
                onClick={() => selectParts(data.id)}
                filter={selected === data.id}
              />
            ))}
          </Box>
        </Stack>
      </Box>
    </div>
  );
};
