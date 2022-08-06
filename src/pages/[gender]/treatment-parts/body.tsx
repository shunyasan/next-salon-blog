import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import fetcher from "services/common/fetcher";
import useSWR from "swr";
import { AboutCategory, BaseParts, BasicCategory } from "@prisma/client";
import { LoadingModalIcon } from "components/atoms/icons/LoadingModalIcon";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import { OriginCategiryId } from "enums/OriginCategiryIdEnum";
import TreatmentTemplete from "components/templete/pages/treatment/TreatmentTemplete";
import { aboutCategoryRepository } from "services/common/repository";
import { Gender } from "types/Gender";

type Props = {
  about: (AboutCategory & {
    basicCategory: BasicCategory[];
  })[];
  gender: Gender;
};

const originId = OriginCategiryId.body;

export const getStaticPaths: GetStaticPaths = async () => {
  const arr: Gender[] = ["men", "lady"];
  const paths = arr.map((ge) => `/${ge}/treatment-parts/body`);
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

const TreatmentBodyParts: NextPage<Props> = ({ about, gender }) => {
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
        <title>体幹の脱毛可能な部位 | 脱毛コンサルタント</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」大手から優良小規模で脱毛可能な部位です。おすすめの部位から意外な部位まで掲載しています。"
        />
      </Head>
      <BgImgH1 title="体幹の脱毛可能な部位" />
    </TreatmentTemplete>
  );
};
export default TreatmentBodyParts;
