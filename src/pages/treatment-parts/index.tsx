import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { OriginCategoryBox } from "components/organisms/box/OriginCategoryBox";
import { PartsBox } from "components/organisms/box/PartsBox";
import { AboutTreatmentParts } from "components/organisms/lists/AboutTreatmentParts";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { thisURL } from "services/api/config";
import fetcher from "services/api/fetcher";
import { searchForPlan } from "services/parameter/CreateParameterHooks";
import useSWR from "swr";
import { AboutCategory } from "types/api/AboutCategory";
import { BaseParts } from "types/api/BaseParts";
import { IdAndNameDto } from "types/api/dto/IdAndNameDto";

type Props = {
  origin: IdAndNameDto[];
  about: AboutCategory[];
  parts: BaseParts[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const origin: IdAndNameDto[] = await fetcher(
    `${thisURL}api/id-and-name/origin-category`
  );
  const about: AboutCategory[] = await fetcher(
    `${thisURL}api/about-categories/originId/${origin[0].id}`
  );
  const parts: BaseParts[] = await fetcher(
    `${thisURL}api/base-parts/${about[0].id}?gender=女性`
  );
  return {
    props: {
      origin,
      about,
      parts,
    },
  };
};

const TreatmentParts: NextPage<Props> = ({ origin, about, parts }) => {
  const router = useRouter();
  const [originId, setOriginId] = useState<string>(origin[0].id);
  const [aboutId, setAboutId] = useState<string>(about[0].id);
  const [gender, setGender] = useState<string>("女性");

  const searchForPlanFunc = (
    gender: string,
    originId: string,
    aboutCategoryId: string,
    partsId?: string
  ) => {
    const param = searchForPlan(gender, originId, aboutCategoryId, partsId);
    router.push({
      pathname: "/salon/search",
      search: param,
    });
  };

  const { data: originData = origin, error: err_ori } = useSWR<IdAndNameDto[]>(
    `/api/id-and-name/origin-category`,
    fetcher
    // { fallback: origin }
  );

  const { data: viewAboutCategory = about, error: err_abo } = useSWR<
    AboutCategory[]
  >(
    `/api/about-categories/originId/${originId}`,
    async (url) => {
      const data: AboutCategory[] = await fetcher(url);
      setAboutId(data[0].id);
      return data;
    }
    // { fallback: about }
  );

  const { data: viewBaseParts = parts, error: err_base } = useSWR<BaseParts[]>(
    `/api/base-parts/${aboutId}?gender=${gender}`,
    fetcher
    // { fallback: parts }
  );

  const changeGenderState = useCallback(
    (genderParam: string) => {
      if (gender !== genderParam) {
        setGender(genderParam);
      }
    },
    [gender]
  );

  return (
    <Box
      my={"3rem"}
      px={{ md: "3rem", sm: "1rem" }}
      textAlign={"center"}
      w={"100%"}
    >
      <Head>
        <title>施術可能部位の一覧 | あなたのための脱毛</title>
        <meta
          name="description"
          content="「渋谷・恵比寿・新宿・銀座・六本木・池袋」大手から優良小規模で脱毛可能な部位です。おすすめの部位から意外な部位まで掲載しています。"
        />
      </Head>
      <Text fontSize={"1.5rem"}>施術可能な部位一覧</Text>
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
      <Flex
        mt="2rem"
        mx={"auto"}
        wrap={"wrap"}
        w={{ md: "70%", sm: "95%" }}
        justifyContent={"center"}
      >
        {originData.map((data, int) => (
          <OriginCategoryBox
            key={int}
            name={data.name}
            onClick={() => setOriginId(data.id)}
            arrow={
              viewAboutCategory[0] && viewAboutCategory[0].originId === data.id
            }
            fontSize={"1.2rem"}
            width={{ md: "16.6%", sm: "33.3%" }}
          />
        ))}
      </Flex>
      <Box mt="2rem">
        <AboutTreatmentParts
          about={viewAboutCategory}
          gender={gender}
          selectedId={viewBaseParts[0] && viewBaseParts[0].aboutCategoryId}
          onClick={(id: string) => setAboutId(id)}
          search={(originId: string, id: string) =>
            searchForPlanFunc(gender, originId, id)
          }
        />
      </Box>
      <HStack
        w={{ md: "80%", sm: "95%" }}
        mx="auto"
        spacing={"0"}
        // mt="1rem"
        wrap={"wrap"}
        justifyContent={"space-evenly"}
      >
        {viewBaseParts.map((data, i) => (
          <PartsBox
            key={i}
            parts={data}
            width={"10rem"}
            search={() =>
              searchForPlanFunc(
                gender,
                viewAboutCategory[0].originId,
                data.aboutCategoryId,
                data.id
              )
            }
          />
        ))}
      </HStack>
      {/* <Adsense /> */}
    </Box>
  );
};
export default TreatmentParts;
