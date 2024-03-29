import { Box, Center, Flex, HStack, Text } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/react";
import {
  AboutCategory,
  BaseParts,
  BasicCategory,
  OriginCategory,
} from "@prisma/client";
import { PartsButton } from "components/atoms/button/PartsButton";
import { LoadingModalIcon } from "components/atoms/icons/LoadingModalIcon";
import { GenderPlateBox } from "components/molecules/box/GenderPlateBox";
import { CategoryBox } from "components/organisms/box/CategoryBox";
import { OriginCategoryBox } from "components/organisms/box/OriginCategoryBox";
import { useRouter } from "next/router";
import React, { FC, useCallback, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import fetcher from "services/common/fetcher";

import useSWR from "swr";
import { Gender } from "types/Gender";

import { IdAndNameDto } from "types/IdAndNameDto";

type Props = {
  // partsクリック時にデータを受け取る
  onClick: (
    origin: IdAndNameDto,
    about: IdAndNameDto,
    parts: IdAndNameDto
  ) => void;
  isOpen: boolean;
  onClose: () => void;
};

const TreatmentPartsBox: FC<Props> = (props) => {
  const { onClick, isOpen, onClose } = props;
  const router = useRouter();
  const gender = (router.query.gender as Gender) || "lady";

  // const [gender, setGender] = useState<Gender>("lady");
  //配列番号を所持
  const [origin, setOrigin] = useState<IdAndNameDto>({
    // id: originCategories[0].id,
    // name: originCategories[0].name,
    id: "ORC000001",
    name: "顔・首",
  });
  const [about, setAbout] = useState<IdAndNameDto>({
    // id: aboutCategories[0].id,
    // name: aboutCategories[0].name,
    id: "ABC000001",
    name: "単部位（顔）",
  });

  const { data: originCategoryData, error: err_ori } = useSWR<IdAndNameDto[]>(
    `/api/origin-category/id-and-name/`,
    fetcher
  );

  const { data: aboutCategoryData, error: err_abo } = useSWR<AboutCategory[]>(
    `/api/about-categories/originId/${origin.id}`,
    fetcher
  );

  // パラメータ直す
  const { data: basicCategory, error: err_parts } = useSWR<BasicCategory[]>(
    `/api/basic-category/${about.id}?gender=${gender}`,
    fetcher
  );

  const onClickParts = useCallback(
    (parts: IdAndNameDto) => {
      onClick(
        { id: origin.id, name: origin.name },
        { id: about.id, name: about.name },
        { id: parts.id, name: parts.name }
      );
      onClose();
    },
    [origin, onClick, onClose, about]
  );

  useEffect(() => {
    aboutCategoryData?.length &&
      setAbout({
        id: aboutCategoryData[0].id,
        name: aboutCategoryData[0].name,
      });
  }, [aboutCategoryData]);

  // if (!originCategoryData || !aboutCategoryData || !basicCategory)
  //   return <LoadingModalIcon />;
  return (
    <Box
      width="100%"
      height="100%"
      position="fixed"
      top="0"
      left="0"
      visibility={isOpen ? "visible" : "hidden"}
      zIndex="1000"
      bg="rgba(30,30,30,0.5)"
    >
      {/* クリニック情報は重複するから入れない  
    部位の施術範囲とか常々情報が変わるものを入れる*/}
      <Box
        px={{ md: "3em", sm: "1em" }}
        bg="originWhite"
        w={{ md: "80%", sm: "90%" }}
        h="90%"
        mx="auto"
        my="2rem"
        overflow={"scroll"}
      >
        {(!originCategoryData || !aboutCategoryData || !basicCategory) && (
          <LoadingModalIcon />
        )}
        <Icon
          pos="sticky"
          top=".5em"
          float={"right"}
          cursor={"pointer"}
          fontSize={"2.3em"}
          textAlign={"right"}
          as={MdClose}
          onClick={onClose}
          bg="originWhite"
        />
        <Box my={"3em"} textAlign="center">
          <Text mb="2em">希望する部位を選択してください</Text>
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
            w={{ md: "50%", sm: "90%" }}
            mx="auto"
            textAlign="center"
            // mt="1rem"
            wrap={"wrap"}
            justifyContent={"left"}
            // visibility={aboutArray === i ? "visible" : "hidden"}
          >
            {basicCategory &&
              basicCategory.map((parts, i) => (
                <Flex key={i}>
                  <PartsButton
                    text={parts.name}
                    onClick={() =>
                      onClickParts({ id: parts.id, name: parts.name })
                    }
                  />
                </Flex>
              ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
export default TreatmentPartsBox;
