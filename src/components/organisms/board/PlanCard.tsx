import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { OpeningHoursTable } from "components/molecules/table/OpeningHoursTable";
import { useRouter } from "next/router";
import {
  FC,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useState,
  VFC,
} from "react";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";
import { OrderPlanIdName } from "types/OrderPlanIdName";
import { NoticeClinicDetail } from "../box/NoticeClinicDetail";
import { FreeServiceBoxList } from "../lists/FreeServiceBoxList";
import { PayRerationsBoxList } from "../lists/PayRerationsBoxList";
import { CopyrightImageBox } from "components/molecules/box/CopyrightImageBox";
import { titleValueService } from "services/titleValueService";
import { TitleValue } from "types/TitleValue";
import { resourcesData } from "services/common/resourcesData";
import { RelationClinic } from "types/RelationClinic";
import { TopResource } from "../../../../resorces/TopResource";
import { Gender } from "types/Gender";

type Props = {
  clinic: RelationClinic;
  genderParam: Gender;
  children?: ReactNode;
};

const img = TopResource.clinicImg1;
const { getRandomImg } = resourcesData();

export const PlanCard: FC<Props> = (props) => {
  const { clinic, children, genderParam } = props;
  const router = useRouter();
  // const { getPriceByClinicId } = PriceApi();
  // const { getRandomImg } = SearchSalonHooks();

  // 画像準備期間のみ
  const [image, setImage] = useState<string[]>([]);

  useEffect(() => {
    const gets = [...Array(2)].map(() => getRandomImg());
    setImage(gets);
  }, [children]);
  //

  return (
    <Box
      // p={"0 1rem 1rem"}
      borderRadius={8}
      shadow={"0 4px 8px 2px rgb(180,180,180)"}
      color={"#333"}
    >
      <Box
        textAlign={"left"}
        py={".5em"}
        pl={"1em"}
        fontSize={"1.1em"}
        fontWeight={"bold"}
        pos="sticky"
        top="0"
        bg="originWhite"
        zIndex="50"
        borderRadius={8}
      >
        {clinic.name}
      </Box>
      <Flex
        // minH={"15rem"}
        wrap={"wrap"}
        justifyContent={{ md: "space-evenly", sm: "center" }}
        alignItems={"flex-start"}
        // spacing={"0"}
        // fontFamily={"Zen Maru Gothic, sans-serif"}
      >
        {/* <Box maxW={"22rem"} textAlign={"left"} mb={{ md: "1em", sm: "0" }}> */}
        {/* <Box pb={"2px"} pl={"8px"} fontSize={"1.1em"} fontWeight={"bold"}>
            {clinic.name}
          </Box> */}
        <Flex
          w={{ md: "23em", sm: "100%" }}
          h="15em"
          // spacing={"2em"}
          textAlign={"left"}
          mb={{ md: "1em", sm: "0" }}
          wrap={{ md: "wrap", sm: "nowrap" }}
          overflow={{ md: "hidden", sm: "scroll" }}
          // overflowX={"scroll"}
        >
          <Box>
            <CopyrightImageBox
              width={"24em"}
              height={"15em"}
              src={img}
              picture={clinic.picture[0]}
              // src={TopResource.clinicImg}
              fontSize={"0.7em"}
            />
          </Box>

          {clinic.picture[1] && (
            <Box mt={{ md: "1em", sm: "0" }}>
              <CopyrightImageBox
                width={"24em"}
                height={"15em"}
                src={img}
                picture={clinic.picture[1]}
                // src={TopResource.clinicImg}
                fontSize={"0.7em"}
              />
            </Box>
          )}
        </Flex>
        {/* </Box> */}
        <Stack
          spacing={"0.5rem"}
          // w="13.3rem"
          // w={{
          //   md: "30rem",
          //   sm: "inherit",
          //   // sm: "100%"
          // }}
          maxW={{
            md: "25rem",
            sm: "100%",
          }}
          px={"1em"}
          py={"1em"}
          justifyContent={"center"}
        >
          {children}
          <Flex
            justifyContent={"center"}
            fontSize={"0.8em"}
            textAlign={"left"}
            py="1em"
          >
            <Stack spacing={"5px"}>
              <Text>念の為、公式ホームページのご確認をお願い致します。</Text>
              <Text>掲載情報に相違がある場合がございます。</Text>
            </Stack>
          </Flex>
          <NoticeClinicDetail clinic={clinic} width={"46%"} py={"8px"} />
          <Box pt="1em">
            <HStack justifyContent={"center"}>
              <Text
                textAlign={"center"}
                fontSize={"0.9em"}
                color={"originBlack"}
                fontWeight={"bold"}
              >
                オプションサービス
              </Text>
              <Text
                textAlign={"center"}
                fontSize={"0.5em"}
                color={"originBlack"}
              >
                ※は条件あり
              </Text>
            </HStack>

            <Box
              // pl={{ md: "3rem", sm: "1.5rem" }}
              mt=".5rem"
            >
              {clinic.options && (
                <FreeServiceBoxList clinicOption={clinic.options} />
              )}
            </Box>
          </Box>
          <Box>
            <Text
              textAlign={"center"}
              fontSize={"0.9em"}
              color={"originBlack"}
              fontWeight={"bold"}
            >
              契約/支払い
            </Text>
            <Box
              // pl={{ md: "3rem", sm: "1rem" }}
              mt=".5rem"
            >
              {/* ↓ FreeServiceBoxListと同じ処理にしたい */}
              <PayRerationsBoxList clinic={clinic} />
            </Box>
          </Box>
          <Stack
            spacing={"0.5em"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"0.9em"} color={"originBlack"} fontWeight={"bold"}>
              基本情報
            </Text>
            <Box
              mt={"3px"}
              overflow={"scroll"}
              mx="auto"
              w={{ md: "95%", sm: "95%" }}
            >
              <OpeningHoursTable datas={clinic.clinicOpeningHours} />
            </Box>
            <Flex>
              <Text
                fontSize={"0.8em"}
                color={"originBlack"}
                mr={"1rem"}
                alignItems={"center"}
              >
                最寄り駅
              </Text>
              <Text fontSize={"0.8em"} textAlign={"left"}>
                {clinic.nearestStation}
              </Text>
            </Flex>
          </Stack>

          <Flex justifyContent={"center"}>
            <Box>
              <Link
                href={clinic.url || ""}
                _hover={{ textDecoration: "none" }}
                _focus={{ outline: "none" }}
                isExternal
              >
                <Button my={"1rem"} mx={"1.5rem"} size={"lg"} variant="base">
                  公式サイト
                </Button>
              </Link>
            </Box>
            <Box>
              <Button
                my={"1rem"}
                mx={"1.5rem"}
                size={"lg"}
                variant="secBase"
                onClick={() =>
                  router.push(`/${genderParam}/clinic/detail/${clinic.id}`)
                }
              >
                詳細
              </Button>
            </Box>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};
