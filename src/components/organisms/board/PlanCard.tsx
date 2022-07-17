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
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import { newOptionFunc } from "services/app/etc/etc";
import { getRandomImg } from "services/app/resources/SearchSalonHooks";
import { ClinicNestPriceDto } from "types/ClinicNestPriceDto";
import { OptionText } from "types/app/OptionText";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { NoticeClinicDetail } from "../box/NoticeClinicDetail";
import { FreeServiceBoxList } from "../lists/FreeServiceBoxList";
import { PayRerationsBoxList } from "../lists/PayRerationsBoxList";
import { CopyrightImageBox } from "components/molecules/box/CopyrightImageBox";

type Props = {
  clinic: ClinicNestPriceDto;
};

const take = 10;
const skip = 2;

export const PlanCard: FC<Props> = (props) => {
  const { clinic } = props;
  const router = useRouter();
  // const { getPriceByClinicId } = PriceApi();
  // const { getRandomImg } = SearchSalonHooks();

  const [payment, setPayment] = useState<OptionText[]>([]);
  // 画像準備期間のみ
  const [image, setImage] = useState<string[]>([]);

  useEffect(() => {
    const gets = [...Array(2)].map(() => getRandomImg());
    setImage(gets);
  }, []);
  //

  const OptionFunc = useCallback(async () => {
    const clinicOptionList = newOptionFunc(clinic);
    setPayment(clinicOptionList.payment);
  }, [clinic]);

  useEffect(() => {
    OptionFunc();
  }, [OptionFunc]);

  return (
    <Box
      p={"0 1rem 1rem"}
      borderRadius={8}
      shadow={"0 4px 8px 2px rgb(180,180,180)"}
      color={"#333"}
    >
      <Box
        textAlign={"left"}
        py={".5em"}
        pl={".5em"}
        fontSize={"1.1em"}
        fontWeight={"bold"}
        pos="sticky"
        top="0"
        bg="originWhite"
        zIndex="50"
      >
        {clinic.clinic.name}
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
          // h="15em"
          // spacing={"2em"}
          textAlign={"left"}
          mb={{ md: "1em", sm: "0" }}
          wrap={{ md: "wrap", sm: "nowrap" }}
          overflow={{ md: "hidden", sm: "scroll" }}
          // overflowX={"scroll"}
        >
          <Box>
            <CopyrightImageBox
              width={"23em"}
              height={"15em"}
              src={image[0]}
              picture={clinic.clinic.picture[0]}
              // src={TopResource.clinicImg}
              fontSize={"0.4em"}
            />
          </Box>

          {clinic.clinic.picture[1] && (
            <Box mt="1em">
              <CopyrightImageBox
                width={"23em"}
                height={"15em"}
                src={image[1]}
                picture={clinic.clinic.picture[1]}
                // src={TopResource.clinicImg}
                fontSize={"0.4em"}
              />
            </Box>
          )}
          {/* <Image
            w={"23em"}
            h="15em"
            // transform={"scale(1.1,1.1)"}
            src={
              clinic.clinic.picture[0] ? clinic.clinic.picture[0].url : image[0]
            }
            alt={"イメージ"}
            objectFit={"contain"}
          />
          <Image
            w={"23em"}
            h="15em"
            objectFit={"contain"}
            mt={{ md: "1em", sm: "0" }}
            src={
              clinic.clinic.picture[1] ? clinic.clinic.picture[1].url : image[1]
            }
            alt={"クリニック画像-2"}
          /> */}
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
          px={"0.5em"}
          // py={"1em"}
          justifyContent={"center"}
        >
          {/* {price && orderDataIdName ? (
            <PriceDataBox price={price} orderDataIdName={orderDataIdName} />
          ) : undefined} */}
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
          <NoticeClinicDetail clinic={clinic.clinic} width={"46%"} py={"8px"} />
          <Box pt="1em">
            <Text
              textAlign={"center"}
              fontSize={"0.9em"}
              color={"originBlack"}
              fontWeight={"bold"}
            >
              オプションサービス
            </Text>
            <Box pl={{ md: "3rem", sm: "1.5rem" }} mt=".5rem">
              {clinic.clinic.options && (
                <FreeServiceBoxList clinicOption={clinic.clinic.options} />
              )}
            </Box>
          </Box>
          {payment && (
            <Box>
              <Text
                textAlign={"center"}
                fontSize={"0.9em"}
                color={"originBlack"}
                fontWeight={"bold"}
              >
                契約/支払い
              </Text>
              <Box pl="3rem" mt=".5rem">
                {/* ↓ FreeServiceBoxListと同じ処理にしたい */}
                <PayRerationsBoxList payments={payment} />
              </Box>
            </Box>
          )}
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
              <OpeningHoursTable datas={clinic.clinic.clinicOpeningHours} />
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
                {clinic.clinic.nearestStation}
              </Text>
            </Flex>
          </Stack>

          <Flex justifyContent={"center"}>
            <Box>
              <Link
                href={clinic.clinic.url || ""}
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
                  router.push(`/clinic/detail/${clinic.clinic.id}`)
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
