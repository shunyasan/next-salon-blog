import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  AboutCategory,
  Clinic,
  ClinicOpeningHours,
  ClinicOption,
  Picture,
} from "@prisma/client";
import { UnderLineItemBox } from "components/molecules/box/UnderLineItemBox";
import { OpeningHoursTable } from "components/molecules/table/OpeningHoursTable";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import {
  ClinicOptionTitleValue,
  ClinicOtherTitleValue,
} from "services/app/clinic/ClinicDetailHooks";
import { getRandomImg } from "services/app/resources/SearchSalonHooks";
import { IdAndNameDto } from "types/IdAndNameDto";
import { PriceDto } from "types/PriceDto";
import { TitleValue } from "types/app/TitleValue";
import { NoticeClinicDetail } from "../box/NoticeClinicDetail";
import { PairDataBoxList } from "../lists/PairDataBoxList";
import { PairDataRowBoxList } from "../lists/PairDataRowBoxList";
import { PairDataRowBoxList_2 } from "../lists/PairDataRowBoxList_2";
import { ClinicPlanCard } from "./ClinicPlanCard";
import { PriceByAboutCategory } from "types/PriceByAboutCategory";
import { RelationClinic } from "types/RelationClinic";
import { CopyrightImageBox } from "components/molecules/box/CopyrightImageBox";

type Props = {
  clinicData: RelationClinic;
  originData: IdAndNameDto[];
  prices: PriceByAboutCategory[];
  onClickOriginId: (originId: string) => void;
  onClickGender: (gender: string) => void;
  // aboutCategoryData: AboutCategory[];
  // priceData: PriceDto[];
};

export const ClinicDetailCard: FC<Props> = (props) => {
  const { clinicData, originData, prices, onClickOriginId, onClickGender } =
    props;
  // const { getRandomImg } = SearchSalonHooks();
  // const { ClinicOtherTitleValue, ClinicOptionTitleValue } = ClinicDetailHooks();

  const [otherData, setOtherData] = useState<TitleValue[]>();
  const [optionData, setOptionData] = useState<TitleValue[]>();

  const [image, setImage] = useState<string[]>([]);
  const [topImg, setTopImg] = useState<string>();
  const [selectPicture, setSelectPicture] = useState<Picture>(
    clinicData.picture[0]
  );

  useEffect(() => {
    const gets = [...Array(2)].map(() => getRandomImg());
    setImage(gets);
    setTopImg(gets[0]);
  }, []);
  //

  const payDatas: TitleValue[] = [
    { title: "カード払い", value: clinicData.cardPay || "不明" },
    {
      title: "医療ローン",
      value: clinicData.medhicalLoan || "不明",
    },
    // {
    //   title: "URL",
    //   value: clinicData.url,
    // },
    {
      title: "途中解約",
      value: clinicData.clinicOption?.contractCancellation || "不明",
    },
  ];

  useEffect(() => {
    const option = clinicData.clinicOption
      ? ClinicOptionTitleValue(clinicData.clinicOption)
      : undefined;
    setOptionData(option);

    const other = ClinicOtherTitleValue(clinicData);
    setOtherData(other);
  }, [clinicData]);

  return (
    <>
      <Box w={{ md: "28em", sm: "100%" }} h={"18em"} mx={"auto"} zIndex={"0"}>
        <CopyrightImageBox
          width={{ md: "28em", sm: "100%" }}
          height={{ md: "18em", sm: "100%" }}
          src={image[0]}
          picture={selectPicture}
          // src={TopResource.clinicImg}
          fontSize={"0.7em"}
        />
        {/* <Image
          src={topImg}
          w={"28rem"}
          h={"18rem"}
          objectFit={"contain"}
          mx={"auto"}
          alt={clinicData.name}
        /> */}
      </Box>
      <Flex
        overflow={"scroll"}
        justifyContent={"center"}
        my={"1em"}
        wrap={"wrap"}
      >
        {clinicData.picture.map((data, i) => (
          // <Box
          //   key={data.id}
          //   w={"4rem"}
          //   h={"2.5rem"}
          //   mx={"1em"}
          //   objectFit={"contain"}
          //   // onClick={() => setTopImg(src)}
          //   onClick={() => setSelectPicture(data)}
          // >
          //   <CopyrightImageBox
          //     src={image[i]}
          //     picture={selectPicture}
          //     // src={TopResource.clinicImg}
          //     fontSize={"0.7em"}
          //   />
          // </Box>
          <Image
            key={data.id}
            w={"4em"}
            h={"2.5em"}
            src={data.url}
            mx={"1em"}
            objectFit={"contain"}
            onClick={() => setSelectPicture(data)}
            alt={clinicData.name}
          />
        ))}
      </Flex>
      <Box
        // w={{ md: "85%", sm: "100%" }}
        // mx={"auto"}
        // spacing={{ md: "2em", sm: "1em" }}
        mt={"2em"}
        justifyContent={"center"}
        pb={"2em"}
        px={{ md: "2em", sm: "1em" }}
      >
        <NoticeClinicDetail
          clinic={clinicData}
          width={"46%"}
          py={"1em"}
          fontSize={{ md: "1rem", sm: "0.9rem" }}
        />
        <Box mt="2em">
          <Flex
            // justifyContent={"center"}
            mt={"3px"}
            overflow={"scroll"}
            display={{ md: "flex", sm: "none" }}
          >
            <Box w="35em" mx="auto">
              <OpeningHoursTable
                datas={clinicData.clinicOpeningHours}
                size={"sm"}
              />
            </Box>
          </Flex>
          <Flex
            // justifyContent={"center"}
            mt={"3px"}
            overflow={"scroll"}
            display={{ md: "none", sm: "flex" }}
          >
            <Box w="35em" mx="auto">
              <OpeningHoursTable
                datas={clinicData.clinicOpeningHours}
                size={"xs"}
              />
            </Box>
          </Flex>
        </Box>
        <UnderLineItemBox title={"オプションサービス"} ankerId={"option"}>
          {optionData && (
            <Flex justifyContent={"center"} pl={{ md: "2em", sm: ".5em" }}>
              <PairDataRowBoxList
                datas={optionData}
                my={{ md: "1em", sm: "0.8em" }}
              />
            </Flex>
          )}
        </UnderLineItemBox>
        <UnderLineItemBox title={"契約・支払い"} ankerId={"payment"}>
          <Flex justifyContent={"center"} pl={{ md: "2em", sm: ".5em" }}>
            <PairDataRowBoxList_2
              datas={payDatas}
              my={{ md: "1em", sm: "0.8em" }}
              // width={{ md: "33.3%", sm: "11.5rem" }}
              // justifyContent={"space-between"}
            />
          </Flex>
        </UnderLineItemBox>
        <UnderLineItemBox title={"アクセス"} ankerId={"access"}>
          {otherData && (
            <PairDataBoxList
              datas={otherData}
              bg={"#eee"}
              fontSize={".85rem"}
            />
          )}
        </UnderLineItemBox>
        <UnderLineItemBox title={"料金"} ankerId={"fee"}>
          <Box px={{ md: "1em", sm: "0" }}>
            <ClinicPlanCard
              url={clinicData.url || "#"}
              options={optionData}
              originData={originData}
              onClickOriginId={(originId: string) => onClickOriginId(originId)}
              onClickGender={(gender: string) => onClickGender(gender)}
              // aboutCategoryData={aboutCategoryData}
              // priceData={priceData || []}
              prices={prices}
            />
          </Box>
        </UnderLineItemBox>
        {/* <UnderLineItemBox title={"予約情報・口コミ"} ankerId={"sns"}>
          <Flex h="10rem" px="2em">
            なんちゃら
          </Flex>
        </UnderLineItemBox>
        <UnderLineItemBox title={"Youtube"} ankerId={"youtube"}>
          <Flex h="10rem" px="2em">
            なんちゃら
          </Flex>
        </UnderLineItemBox> */}
      </Box>
    </>
  );
};
