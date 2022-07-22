import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import fetcher from "services/common/fetcher";
import useSWR from "swr";
import { AboutCategory, BaseParts, OriginCategory } from "@prisma/client";
import { LoadingModalIcon } from "components/atoms/icons/LoadingModalIcon";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import { OriginCategiryId } from "enums/OriginCategiryIdEnum";
import TreatmentTemplete from "components/templete/pages/treatment/TreatmentTemplete";
import { IdAndNameDto } from "types/IdAndNameDto";
import { aboutCategoryRepository } from "services/common/repository";

type Props = {
  // origin: IdAndNameDto[];
  about: (AboutCategory & {
    baseParts: BaseParts[];
  })[];
};

const originId = OriginCategiryId.face;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const about = await aboutCategoryRepository.getJoinBasicParts(originId, 2);
  return {
    props: {
      about,
    },
  };
};

const TreatmentFaceParts: NextPage<Props> = ({ about }) => {
  // const [aboutId, setAboutId] = useState<string>(about[0].id);
  const [gender, setGender] = useState<string>("女性");
  const [aboutString, setAboutString] = useState<string>("test");
  const router = useRouter();

  const { data: aboutCategories, error: err_abo } = useSWR<
    (AboutCategory & {
      baseParts: BaseParts[];
    })[]
  >(
    `/api/about-categories/originId?originId=${originId}&gender=${gender}`,
    fetcher,
    { fallbackData: about }
  );

  const changeGenderState = useCallback(
    (genderParam: string) => {
      if (gender !== genderParam) {
        setGender(genderParam);
      }
    },
    [gender]
  );

  if (!aboutCategories) return <LoadingModalIcon />;
  return (
    <TreatmentTemplete
      selectedOriginId={originId}
      about={aboutCategories}
      gender={gender}
    >
      <Head>
        <title>顔の脱毛可能な部位 | 脱毛コンサルタント</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」大手から優良小規模で脱毛可能な部位です。おすすめの部位から意外な部位まで掲載しています。"
        />
      </Head>
      <BgImgH1 title="顔の脱毛可能な部位" />
      <HStack mt="2rem" justifyContent={"center"}>
        <Box
          cursor={"pointer"}
          p={"0.5rem 1rem"}
          color={gender === "女性" ? "originWhite" : ""}
          bg={gender === "女性" ? "originBlack" : ""}
          onClick={() => changeGenderState("女性")}
          transition={"0.2s"}
          transitionTimingFunction={"linear"}
        >
          女性
        </Box>
        <Box
          cursor={"pointer"}
          p={"0.5rem 1rem"}
          color={gender === "男性" ? "originWhite" : ""}
          bg={gender === "男性" ? "originBlack" : ""}
          onClick={() => changeGenderState("男性")}
          transition={"0.2s"}
          transitionTimingFunction={"linear"}
        >
          男性
        </Box>
      </HStack>
    </TreatmentTemplete>
  );
};

export default TreatmentFaceParts;
