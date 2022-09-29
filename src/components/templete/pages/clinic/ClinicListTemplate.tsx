import { Box, Checkbox, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Clinic, Area, Instagram, Twitter } from "@prisma/client";
import { LoadingModalIcon } from "components/atoms/icons/LoadingModalIcon";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import { PlanCard } from "components/organisms/board/PlanCard";
import { AreaBox } from "components/organisms/box/AreaBox";
import { Pagenation } from "components/templete/pagenation/Pagenation";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { FC, useEffect } from "react";
import fetcher from "services/common/fetcher";
// import { tweet } from "services/tweet";
import useSWR from "swr";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";
import InstagramBox from "components/InstagramBox";
import { UnderLineItemBox } from "components/molecules/box/UnderLineItemBox";
import TwitterBox from "components/TwitterBox";
import { RelationClinic } from "types/RelationClinic";
import { Gender } from "types/Gender";

const numOfTakeData = 10;
const defaultMax = 349;

const defaultPagenation = {
  now: 0,
  block: 0,
};

type Props = {
  areaId?: string;
  title: string;
  maxData: number;
  area: Area[];
  clinics: RelationClinic[];
  page: number;
  twitter: Twitter[];
  instagram: Instagram[];
  getPage: (page: number) => void;
  // defaultPagenation: { now: number; block: number };
};

// export const getStaticProps: GetStaticProps<Props> = async () => {
//   // const area: Area[] = await fetcher(`${thisURL}api/clinic-areas`);

//   const clinics: ClinicNestPriceDto[] =
//   // const clinics: ClinicNestPriceDto[] = await fetcher(
//   //   `${thisURL}api/clinics/prices?take=${numOfTakeData}&skip=0`
//   // );
//   return {
//     props: {
//       area,
//       clinics,
//       defaultPagenation,
//     },
//   };
// };

const ClinicListTemplate: FC<Props> = ({
  title,
  area,
  clinics,
  areaId,
  maxData,
  page,
  twitter,
  instagram,
  getPage,
}) => {
  const router = useRouter();
  const gender = (router.query.gender as Gender) || "lady";

  if (!clinics) return <LoadingModalIcon />;
  return (
    <Box textAlign={"center"}>
      <BgImgH1 title={title} />
      <LoadingModalIcon />
      <Flex justifyContent={"space-evenly"} wrap={"wrap"} my="2rem">
        {area.length > 0 &&
          area.map((data, int) => (
            <AreaBox
              key={int}
              area={data.area}
              fontSize={"1.2rem"}
              description={data.description || ""}
              arrow={areaId === data.id ? true : false}
              onClick={() => router.push(`/${gender}/clinic${data.url}/1`)}
              // onClick={() =>
              //   getClinicDataAndAreaId(0, data.id, data.registrationNumber)
              // }
            />
          ))}
      </Flex>
      <Pagenation
        max={maxData}
        take={numOfTakeData}
        nowPage={page}
        pageBlock={Math.floor(page / 5)}
        onClickNumber={(page: number, block?: number) => getPage(page)}
      >
        {/* <Box mt={"2rem"}>
          <Checkbox colorScheme="yellow" value={}>系列クリニックをまとめる</Checkbox>
        </Box> */}
        <HStack
          spacing={"1rem"}
          m="3rem 1rem"
          alignItems={"flex-start"}
          justifyContent={"space-evenly"}
        >
          <Stack w={{ md: "55rem", sm: "100%" }} spacing={"3rem"}>
            {clinics.map((data, int) => (
              <PlanCard clinic={data} key={int} genderParam={gender} />
            ))}
          </Stack>
          <Box display={{ md: "block", sm: "none" }} w="22rem" minW="15em">
            <UnderLineItemBox title="最新情報" fontSize="1em">
              <Stack spacing={"3rem"}>
                {twitter.map((account, i) => (
                  <TwitterBox key={i} twitter={account} height="400px" />
                ))}
              </Stack>
            </UnderLineItemBox>
            <Box mt="5rem">
              <UnderLineItemBox title="キャンペーン・おすすめ" fontSize="1em">
                <Stack spacing={"3rem"} mt={"1rem"}>
                  {instagram.map((data, i) => (
                    <InstagramBox key={i} instagram={data} />
                  ))}
                </Stack>
              </UnderLineItemBox>
            </Box>
          </Box>
        </HStack>
      </Pagenation>
    </Box>
  );
};
export default ClinicListTemplate;
