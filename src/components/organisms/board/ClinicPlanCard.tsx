import { Box, Center, Flex, Text, useDisclosure } from "@chakra-ui/react";
import {
  AboutCategory,
  Clinic,
  ClinicOpeningHours,
  ClinicOption,
} from "@prisma/client";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import getPriceByAboutIdAndClinicId from "pages/api/prices/clinic/[id]";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import fetcher from "services/orm/fetcher";
import useSWR from "swr";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
import { PriceDto } from "types/api/dto/PriceDto";
import { AbobutCategiryId } from "../../../enums/AbobutCategiryIdEnum";
import { OriginCategiryId } from "../../../enums/OriginCategiryIdEnum";
import { SmallPlanCard } from "../box/SmallPlanCard";
import { AboutTreatmentParts } from "../lists/AboutTreatmentParts";
import { PlanDetailModal } from "../modal/PlanDetailModal";

type Props = {
  clinicData: Clinic & {
    clinicOption: ClinicOption | null;
    clinicOpeningHours: ClinicOpeningHours[];
  };
  originData: IdAndNameDto[];
  aboutCategoryData: AboutCategory[];
  priceData: PriceDto[];
};

export const ClinicPlanCard: FC<Props> = (props) => {
  const { clinicData, originData, aboutCategoryData, priceData } = props;
  // const { getAboutCategoryByOriginId } = AboutCategoryApi();
  // const { getAllOriginCategoryIdAndName } = IdAndNameApi();
  // const { getPriceByAboutIdAndClinicId } = PriceApi();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectTab, setSelectTab] = useState<string>(OriginCategiryId.face);
  // const [originData, setOriginData] = useState<IdAndNameDto[]>([]);
  // const [priceData, setPriceData] = useState<PriceDto[]>([]);
  const [modalPrice, setModalPrice] = useState<PriceDto>();
  const [selectedAboutId, setSelectedAboutId] = useState<string>(
    AbobutCategiryId.upperFace
  );
  // const [aboutCategoryData, setAboutCategoryData] = useState<AboutCategory[]>(
  //   []
  // );

  const [originId, setOriginId] = useState<string>();

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

  const changeAboutCategory = useCallback(async (aboutId: string) => {
    // await getPrices(aboutId);
    setSelectedAboutId(aboutId);
  }, []);

  const changeTab = useCallback(async (originId: string) => {
    setOriginId(originId);
    setSelectTab(originId);
    // const data = await getAboutCategory(originId);
    // changeAboutCategory(data[0].id);
  }, []);

  const openPlanDetailModal = useCallback(
    async (price: PriceDto) => {
      setModalPrice(price);
      onOpen();
    },
    [onOpen]
  );

  // useEffect(() => {
  //   getFirstPartsDatas();
  // }, [getFirstPartsDatas]);

  if (!originData || !aboutCategoryData || !priceData) return <LoadingIcon />;
  return (
    <Box>
      <Flex justifyContent={"space-evenly"} wrap={"wrap"}>
        {originData.map((data, i) => (
          <Box
            key={i}
            width={{ md: "16.6%", sm: "33.3%" }}
            py={"1em"}
            color={selectTab === data.id ? "originGold" : ""}
            fontWeight={selectTab === data.id ? "bold" : ""}
            borderBottom={selectTab === data.id ? "2px" : ""}
            borderColor={selectTab === data.id ? "originGold" : ""}
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
      <AboutTreatmentParts
        about={aboutCategoryData}
        gender={"男性"}
        selectedId={selectedAboutId}
        onClick={(id: string) => changeAboutCategory(id)}
      />
      {priceData.length !== 0 ? (
        <>
          <Flex wrap={"wrap"} justifyContent={"space-evenly"}>
            {priceData.map((data, i) => (
              <>
                <Box
                  w={{ md: "40%", sm: "30em" }}
                  m={{ md: "0.5rem", sm: "0.3rem 0" }}
                  key={i}
                >
                  <SmallPlanCard
                    price={data}
                    onClick={() => openPlanDetailModal(data)}
                  />
                </Box>
              </>
            ))}
          </Flex>
          {modalPrice && (
            <PlanDetailModal
              isOpen={isOpen}
              onClose={onClose}
              price={modalPrice}
              clinic={clinicData}
            />
          )}
        </>
      ) : (
        <Center mt={"2em"}>こちらのプランはありません</Center>
      )}
    </Box>
  );
};
