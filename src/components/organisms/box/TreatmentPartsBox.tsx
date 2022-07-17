import { Box, Center, Flex, HStack, Text } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/react";
import { AboutCategory, BaseParts, OriginCategory } from "@prisma/client";
import { PartsButton } from "components/atoms/button/PartsButton";
import { LoadingIcon } from "components/atoms/icons/LoadingIcon";
import { GenderPlateBox } from "components/molecules/box/GenderPlateBox";
import { CategoryBox } from "components/organisms/box/CategoryBox";
import { OriginCategoryBox } from "components/organisms/box/OriginCategoryBox";
import { useRouter } from "next/router";
import React, { FC, useCallback, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import fetcher from "services/common/fetcher";

import useSWR from "swr";

import { IdAndNameDto } from "types/IdAndNameDto";

type Props = {
  // 初期値は渡す
  originCategories: OriginCategory[];
  aboutCategories: AboutCategory[];
  baseParts: BaseParts[];
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
  const {
    aboutCategories,
    baseParts,
    originCategories,
    onClick,
    isOpen,
    onClose,
  } = props;
  const router = useRouter();

  const [gender, setGender] = useState<string>("女性");
  //配列番号を所持
  const [origin, setOrigin] = useState<IdAndNameDto>({
    id: originCategories[0].id,
    name: originCategories[0].name,
    // id: originCategories[0].id,
    // name: originCategories[0].name,
  });
  const [about, setAbout] = useState<IdAndNameDto>({
    id: aboutCategories[0].id,
    name: aboutCategories[0].name,
  });

  const { data: aboutCategoryData, error: err_abo } = useSWR<AboutCategory[]>(
    `/api/about-categories/originId/${origin.id}`,
    fetcher,
    {
      fallbackData: aboutCategories,
    }
  );

  // パラメータ直す
  const { data: basePartsData, error: err_parts } = useSWR<BaseParts[]>(
    `/api/base-parts/${about.id}?gender=${gender}`,
    fetcher,
    {
      fallbackData: baseParts,
    }
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
    aboutCategoryData &&
      setAbout({
        id: aboutCategoryData[0].id,
        name: aboutCategoryData[0].name,
      });
  }, [aboutCategoryData]);

  if (!aboutCategoryData || !basePartsData) return <LoadingIcon />;
  return (
    <Box
      width="100%"
      height="100%"
      position="fixed"
      top="0"
      left="0"
      visibility={isOpen ? "visible" : "hidden"}
      zIndex="100"
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
        <Box textAlign={"right"} pt="1em" pos="sticky" top="0">
          <Icon
            cursor={"pointer"}
            fontSize={"2.3em"}
            textAlign={"right"}
            as={MdClose}
            onClick={onClose}
            bg="originWhite"
          />
        </Box>
        <Box mb={"2em"} textAlign="center">
          <Text mb="2em">希望する部位を選択してください</Text>
          <Box>
            <GenderPlateBox
              gender={gender}
              fontSize={{ md: "1.3rem", sm: "1rem" }}
              onClick={(gender: string) => setGender(gender)}
            />
          </Box>
          <Flex
            mt="2rem"
            mx={"auto"}
            wrap={"wrap"}
            w={{ md: "70%", sm: "95%" }}
            justifyContent={"center"}
          >
            {originCategories.map((data, int) => (
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
            {aboutCategoryData.map((abo, i) => (
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
            {basePartsData.map((parts, i) => (
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
