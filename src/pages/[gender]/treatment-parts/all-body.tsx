import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import fetcher from "services/common/fetcher";
import useSWR from "swr";
import { AboutCategory, BaseParts } from "@prisma/client";
import { LoadingModalIcon } from "components/atoms/icons/LoadingModalIcon";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import { OriginCategiryId } from "enums/OriginCategiryIdEnum";
import TreatmentTemplete from "components/templete/pages/treatment/TreatmentTemplete";
import { Layout } from "components/templete/lauouts/Layout";
import { aboutCategoryRepository } from "services/common/repository";
import { Gender } from "types/Gender";

type Props = {
  about: (AboutCategory & {
    baseParts: BaseParts[];
  })[];
  gender: Gender;
};

const originId = OriginCategiryId.allBody;

export const getStaticPaths: GetStaticPaths = async () => {
  const arr: Gender[] = ["men", "lady"];
  const paths = arr.map((ge) => `/${ge}/treatment-parts/all-body`);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const gender = params ? (params.gender as Gender) : "lady";
  const excludeGender = gender === "men" ? 1 : 2;
  const about = await aboutCategoryRepository.getJoinBasicParts(
    originId,
    excludeGender
  );
  return {
    props: {
      about,
      gender,
    },
  };
};

const TreatmentLimbParts: NextPage<Props> = ({ about, gender }) => {
  // const [aboutId, setAboutId] = useState<string>(about[0].id);

  const { data: aboutCategories, error: err_abo } = useSWR<
    (AboutCategory & {
      baseParts: BaseParts[];
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
        <title>全身の脱毛可能な部位 | 脱毛コンサルタント</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」大手から優良小規模で脱毛可能な部位です。おすすめの部位から意外な部位まで掲載しています。"
        />
      </Head>
      <BgImgH1 title="全身の脱毛可能な部位" />
    </TreatmentTemplete>
    // </Layout>
  );
};
export default TreatmentLimbParts;
