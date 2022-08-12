import { Box, Center, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { GenderPlateBox } from "components/molecules/box/GenderPlateBox";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import fetcher from "services/common/fetcher";
import useSWR from "swr";
import { TitleValue } from "types/TitleValue";
import { IdAndNameDto } from "types/IdAndNameDto";
import { CategoryBox } from "../box/CategoryBox";
import { SmallPlanCard } from "../box/SmallPlanCard";
import { AboutCategory, Price } from "@prisma/client";
import { OriginCategoryBox } from "../box/OriginCategoryBox";
import { Gender } from "types/Gender";
import { useRouter } from "next/router";

type Props = {
  url: string;
  clinicId: string;
  options?: TitleValue[];
  // originData: IdAndNameDto[];
  // onClickOriginId: (originId: string) => void;
  // onClickGender: (gender: string) => void;
  // aboutCategoryData?: AboutCategory[];
};

export const ClinicPlanCard: FC<Props> = (props) => {
  const {
    url,
    options,
    clinicId,
    // prices,
    // originData,
    // onClickOriginId,
    // onClickGender,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const gender = (router.query.gender as Gender) || "lady";

  // const [gender, setGender] = useState<Gender>("lady");

  // ↓のやり方でバグあり
  // ファイヤークリニックの箇所

  const [origin, setOrigin] = useState<IdAndNameDto>({
    id: "ORC000001",
    name: "顔・首",
  });
  const [about, setAbout] = useState<IdAndNameDto>({
    id: "ABC000001",
    name: "単部位（顔）",
  });

  const { data: originCategoryData, error: err_ori } = useSWR<IdAndNameDto[]>(
    `/api/origin-category/id-and-name/clinicId/${clinicId}`,
    fetcher
  );

  const { data: aboutCategoryData, error: err_abo } = useSWR<AboutCategory[]>(
    `/api/about-categories/clinic/${clinicId}?originId=${origin.id}`,
    fetcher
  );

  // パラメータ直す
  const { data: price, error: err_parts } = useSWR<Price[]>(
    `/api/prices/clinic/${clinicId}?aboutId=${about.id}&gender=${gender}`,
    fetcher
  );

  useEffect(() => {
    aboutCategoryData?.length &&
      setAbout({
        id: aboutCategoryData[0].id,
        name: aboutCategoryData[0].name,
      });
  }, [aboutCategoryData]);

  if (!originCategoryData || !aboutCategoryData || !price)
    return <LoadingIcon />;
  return (
    <Box mb={"2em"} textAlign="center">
      {/* <Box>
        <GenderPlateBox
          gender={gender}
          fontSize={{ md: "1.3rem", sm: "1rem" }}
          onClick={(gender: Gender) => setGender(gender)}
        />
      </Box> */}
      <Flex
        mt="2rem"
        mx={"auto"}
        wrap={"wrap"}
        w={{ md: "70%", sm: "95%" }}
        justifyContent={"center"}
      >
        {originCategoryData &&
          originCategoryData.map((data, int) => (
            <OriginCategoryBox
              key={int}
              name={data.name}
              onClick={() => setOrigin({ id: data.id, name: data.name })}
              arrow={origin.id === data.id}
              fontSize={"1.2rem"}
              width={{ md: "16.6%", sm: "33.3%" }}
            />
          ))}
      </Flex>
      <Flex
        w={{ md: "80%", sm: "100%" }}
        mx="auto"
        mt="2em"
        wrap={"wrap"}
        justifyContent={"space-evenly"}
      >
        {aboutCategoryData &&
          aboutCategoryData.map((abo, i) => (
            <CategoryBox
              key={i}
              category={abo}
              gender={gender}
              width={{ md: "10rem", sm: "7.5rem" }}
              arrow={about.id === abo.id}
              onClick={() => setAbout({ id: abo.id, name: abo.name })}
            />
          ))}
      </Flex>
      <Flex
        w={"90%"}
        mx="auto"
        textAlign="center"
        // mt="1rem"
        wrap={"wrap"}
        justifyContent={"center"}
        // visibility={aboutArray === i ? "visible" : "hidden"}
      >
        {price.length > 0 ? (
          price.map((data, i) => (
            <Box
              key={data.id}
              w={{ md: "45%", sm: "30em" }}
              m={{ md: "0.5rem", sm: "0.3rem 0" }}
            >
              <SmallPlanCard
                price={data}
                url={url}
                options={options}
                // onClick={() => openPlanDetailModal(price)}
              />
            </Box>
          ))
        ) : (
          <Center mt={"2em"}>こちらのプランはありません</Center>
        )}
      </Flex>
    </Box>
  );
};
