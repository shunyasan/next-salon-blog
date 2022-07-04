import { Box, Center, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import fetcher from "services/fetcher";
import useSWR from "swr";
import { TitleValue } from "types/app/TitleValue";
import { IdAndNameDto } from "types/IdAndNameDto";
import { PriceByAboutCategory } from "types/PriceByAboutCategory";
import { PriceDto } from "types/PriceDto";
import { CategoryBox } from "../box/CategoryBox";
import { SmallPlanCard } from "../box/SmallPlanCard";
import { PlanDetailModal } from "../modal/PlanDetailModal";

type Props = {
  originData: IdAndNameDto[];
  url: string;
  options?: TitleValue[];
  onClickOriginId: (originId: string) => void;
  // aboutCategoryData?: AboutCategory[];
  // priceData?: PriceDto[];
  prices: PriceByAboutCategory[];
};

export const ClinicPlanCard: FC<Props> = (props) => {
  const { url, options, originData, prices, onClickOriginId } = props;
  // const { getAboutCategoryByOriginId } = AboutCategoryApi();
  // const { getAllOriginCategoryIdAndName } = IdAndNameApi();
  // const { getPriceByAboutIdAndClinicId } = PriceApi();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectTab, setSelectTab] = useState<string>(originData[0].id);
  const [selectedAboutId, setSelectedAboutId] = useState<string>();
  const [modalPrice, setModalPrice] = useState<PriceDto>();
  // const [originData, setOriginData] = useState<IdAndNameDto[]>([]);
  // const [priceData, setPriceData] = useState<PriceDto[]>([]);
  // const [aboutCategoryData, setAboutCategoryData] = useState<AboutCategory[]>(
  //   []
  // );

  // const [originId, setOriginId] = useState<string>();

  // const { data: originData, error: err_ori } = useSWR<IdAndNameDto[]>(
  //   `/api/id-and-name/origin-category`,
  //   fetcher,
  //   {
  //     fallbackData: origin,
  //   }
  // );

  // const { data: aboutCategoryData, error: err_abo } = useSWR<AboutCategory[]>(
  //   `/api/about-categories/originId/${originId}`,
  //   fetcher,
  //   {
  //     fallbackData: aboutCategory,
  //   }
  // );

  // const { data: priceData, error: err_pri } = useSWR<PriceDto[]>(
  //   `/api/prices/clinic/${clinicData.id}?aboutId=${
  //     aboutCategoryData ? aboutCategoryData[0].id : aboutCategory[0].id
  //   }`,
  //   fetcher,
  //   {
  //     fallbackData: price,
  //   }
  // );

  // const getOriginCategory = useCallback(async () => {
  //   const data = await getAllOriginCategoryIdAndName();
  //   setOriginData(data);
  //   return data;
  // }, [getAllOriginCategoryIdAndName]);

  // const getAboutCategory = useCallback(
  //   async (originId: string) => {
  //     const data = await getAboutCategoryByOriginId(originId);
  //     setAboutCategoryData(data);
  //     return data;
  //   },
  //   [getAboutCategoryByOriginId]
  // );

  // const getPrices = useCallback(
  //   async (aboutId: string) => {
  //     const data = await getPriceByAboutIdAndClinicId(clinicData.id, aboutId);
  //     setPriceData(data);
  //     return data;
  //   },
  //   [getPriceByAboutIdAndClinicId, clinicData]
  // );

  // const getFirstPartsDatas = useCallback(async () => {
  //   const origin = await getOriginCategory();
  //   const about = await getAboutCategory(origin[0].id);
  //   await getPrices(about[0].id);
  // }, [getOriginCategory, getAboutCategory, getPrices]);

  // const changeAboutCategory = useCallback(async (aboutId: string) => {
  //   // await getPrices(aboutId);
  //   setSelectedAboutId(aboutId);
  // }, []);

  const changeTab = useCallback(
    async (originId: string) => {
      onClickOriginId(originId);
      setSelectTab(originId);
      // const data = await getAboutCategory(originId);
      // changeAboutCategory(data[0].id);
    },
    [onClickOriginId]
  );

  // const openPlanDetailModal = useCallback(
  //   async (price: PriceDto) => {
  //     setModalPrice(price);
  //     onOpen();
  //   },
  //   [onOpen]
  // );

  useEffect(() => {
    setSelectedAboutId(prices[0].aboutCategory.id);
    console.log("id\n" + prices[0].aboutCategory.id);
  }, [setSelectedAboutId, prices]);

  // console.log("selectedAboutId\n" + selectedAboutId);

  if (!originData || !prices) return <LoadingIcon />;
  return (
    <>
      <Flex justifyContent={"space-evenly"} wrap={"wrap"}>
        {originData.map((data, i) => (
          <Box
            key={data.id}
            width={{ md: "16.6%", sm: "33.3%" }}
            py={"1em"}
            mb={"0.5em"}
            color={selectTab === data.id ? "originBlack" : ""}
            fontWeight={selectTab === data.id ? "bold" : ""}
            borderBottom={selectTab === data.id ? "2px" : ""}
            borderColor={selectTab === data.id ? "originBlack" : ""}
            transition={"0.5s"}
            cursor={"pointer"}
            _hover={{
              bg: selectTab === data.id ? "" : "#aaa",
              transition: "0.5s",
            }}
            textAlign={"center"}
            onClick={() => changeTab(data.id)}
          >
            <Box display={"inline-block"}>{data.name}</Box>
          </Box>
        ))}
      </Flex>
      <Flex
        // w={"80%"}
        // mx="auto"
        wrap={"wrap"}
        justifyContent={"space-evenly"}
      >
        {prices.map((data, i) => (
          <CategoryBox
            key={data.aboutCategory.id}
            category={data.aboutCategory}
            gender={"男性"}
            width={{ md: "10rem", sm: "7.5rem" }}
            arrow={selectedAboutId === data.aboutCategory.id}
            onClick={() => setSelectedAboutId(data.aboutCategory.id)}
            //  search={search && (() => search(about.originId, about.id))}
          />
          // <AboutTreatmentParts
          //   key={i}
          //   about={data.aboutCategory}
          //   gender={"男性"}
          //   selectedId={selectedAboutId}
          //   onClick={(id: string) => changeAboutCategory(id)}
          // />
        ))}
      </Flex>
      {prices.map((data, i) =>
        data.prices.length !== 0 ? (
          <Flex
            key={data.aboutCategory.name}
            display={
              data.aboutCategory.id === selectedAboutId ? "flex" : "none"
            }
            wrap={"wrap"}
            justifyContent={"space-evenly"}
          >
            {data.prices.map((price, i) => (
              <Box
                key={price.id}
                w={{ md: "45%", sm: "30em" }}
                m={{ md: "0.5rem", sm: "0.3rem 0" }}
              >
                <SmallPlanCard
                  price={price}
                  url={url}
                  options={options}
                  // onClick={() => openPlanDetailModal(price)}
                />
              </Box>
            ))}
            {/* {modalPrice && (
              <PlanDetailModal
                isOpen={isOpen}
                onClose={onClose}
                price={modalPrice}
                clinic={clinicData}
              />
            )} */}
          </Flex>
        ) : (
          <Center key={i} mt={"2em"}>
            こちらのプランはありません
          </Center>
        )
      )}
    </>
  );
};
