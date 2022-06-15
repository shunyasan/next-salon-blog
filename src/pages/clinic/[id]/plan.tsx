import {
  Box,
  Center,
  Checkbox,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AboutCategory,
  Clinic,
  ClinicOpeningHours,
  ClinicOption,
} from "@prisma/client";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { ClinicPlanCard } from "components/organisms/board/ClinicPlanCard";
import { ClinicSummaryCard } from "components/organisms/board/ClinicSummaryCard";
import { SmallPlanCard } from "components/organisms/box/SmallPlanCard";
import { AboutTreatmentParts } from "components/organisms/lists/AboutTreatmentParts";
import { PlanDetailModal } from "components/organisms/modal/PlanDetailModal";
import ClinicTemplate from "components/templete/pages/clinic/ClinicTemplate";
import { AbobutCategiryId } from "enums/AbobutCategiryIdEnum";
import { OriginCategiryId } from "enums/OriginCategiryIdEnum";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AboutCategoryService } from "services/orm/about-categories/get";
import { ClinicService } from "services/orm/clinics/get";
import fetcher from "services/orm/fetcher";
import { IdAndNameService } from "services/orm/id-and-name/get";
import { PriceService } from "services/orm/prices/get";
import useSWR from "swr";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";
import { PriceDto } from "types/api/dto/PriceDto";

type Props = {
  clinicData: Clinic & {
    clinicOption: ClinicOption | null;
    clinicOpeningHours: ClinicOpeningHours[];
  };
  origin: IdAndNameDto[];
  aboutCategory: AboutCategory[];
  price: PriceDto[];
};

const clinicService = new ClinicService();
const idAndNameService = new IdAndNameService();
const aboutService = new AboutCategoryService();
const priceService = new PriceService();

export const getStaticPaths: GetStaticPaths = async () => {
  const datas: Clinic[] = await clinicService.getAllClinics();
  const paths = datas.map((data) => `/clinic/${data.id}/plan`);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const param = params && params.id;
  const id = param && typeof param === "string" ? param : "";
  const clinicData = await clinicService.getOneClinic(id);

  const origin: IdAndNameDto[] = await idAndNameService.getAllOriginCategory();
  const aboutCategory: AboutCategory[] =
    await aboutService.getAboutCategoryByOriginId(origin[0].id);
  const price: PriceDto[] = await priceService.getPriceByClinic(
    id,
    aboutCategory[0].id
  );

  return {
    props: {
      clinicData: clinicData,
      origin,
      aboutCategory,
      price,
    },
  };
};

const ClinicDetail: NextPage<Props> = ({
  clinicData,
  origin,
  aboutCategory,
  price,
}) => {
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

  const [originId, setOriginId] = useState<string>(OriginCategiryId.face);

  // const { data: originData, error: err_ori } = useSWR<IdAndNameDto[]>(
  //   `/api/id-and-name/origin-category`,
  //   fetcher,
  //   {
  //     fallbackData: origin,
  //   }
  // );

  const { data: aboutCategoryData, error: err_abo } = useSWR<AboutCategory[]>(
    `/api/about-categories/originId/${originId}`,
    fetcher,
    {
      fallbackData: aboutCategory,
    }
  );

  const { data: priceData, error: err_pri } = useSWR<PriceDto[]>(
    `/api/prices/clinic/${clinicData.id}?aboutId=${
      aboutCategoryData?.length ? aboutCategoryData[0].id : aboutCategory[0].id
    }`,
    fetcher,
    {
      fallbackData: price,
    }
  );

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

  if (!origin || !aboutCategoryData || !priceData) return <LoadingIcon />;

  return (
    <ClinicTemplate
      clinicName={clinicData.name}
      selectTab={"プラン詳細"}
      clinicId={clinicData.id}
    >
      <Box>
        <Flex justifyContent={"space-evenly"} wrap={"wrap"}>
          {origin.map((data, i) => (
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
    </ClinicTemplate>
  );
};
export default ClinicDetail;
