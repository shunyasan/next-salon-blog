import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import fetcher from "services/common/fetcher";
import useSWR from "swr";
import {
  AboutCategory,
  BaseParts,
  BasicCategory,
  OriginCategory,
} from "@prisma/client";
import { LoadingModalIcon } from "components/atoms/icons/LoadingModalIcon";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import { OriginCategiryId } from "enums/OriginCategiryIdEnum";
import TreatmentTemplete from "components/templete/pages/treatment/TreatmentTemplete";
import { IdAndNameDto } from "types/IdAndNameDto";
import { aboutCategoryRepository } from "services/common/repository";
import { Gender } from "types/Gender";

type Props = {
  about: (AboutCategory & {
    basicCategory: BasicCategory[];
  })[];
  gender: Gender;
};

const originId = OriginCategiryId.face;

export const getStaticPaths: GetStaticPaths = async () => {
  const arr: Gender[] = ["men", "lady"];
  const paths = arr.map((ge) => `/${ge}/treatment-parts`);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const gender = params ? (params.gender as Gender) : "lady";
  const about = await aboutCategoryRepository.getJoinBasicParts(
    originId
    // gender
  );
  return {
    props: {
      about,
      gender,
    },
  };
};

const TreatmentFaceParts: NextPage<Props> = ({ about, gender }) => {
  // const [aboutId, setAboutId] = useState<string>(about[0].id);

  const { data: aboutCategories, error: err_abo } = useSWR<
    (AboutCategory & {
      basicCategory: BasicCategory[];
    })[]
  >(
    `/api/about-categories/originId?originId=${originId}&gender=${gender}`,
    async (url) => {
      const data = await fetcher(url);
      return data;
      // setAboutId(data[0].id);
    },
    { fallbackData: about }
  );

  // const changeGenderState = useCallback(
  //   (genderParam: string) => {
  //     if (gender !== genderParam) {
  //       setGender(genderParam);
  //     }
  //   },
  //   [gender]
  // );

  if (!aboutCategories) return <LoadingModalIcon />;
  return (
    // <Layout getGender={(gender: string) => setGender(gender)}>
    <TreatmentTemplete
      selectedOriginId={originId}
      about={aboutCategories}
      gender={gender}
    >
      <Head>
        <title>顔の脱毛可能な部位 | 脱毛コンサルタント</title>
        <meta
          name="description"
          content="「渋谷・表参道・原宿」などの首都圏大手から優良小規模で脱毛可能な部位です。おすすめの部位から意外な部位まで掲載しています。"
        />
      </Head>
      <BgImgH1 title="顔の脱毛可能な部位" />
    </TreatmentTemplete>
  );
};

export default TreatmentFaceParts;
