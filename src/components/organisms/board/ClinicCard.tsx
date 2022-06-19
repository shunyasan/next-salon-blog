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
import { ClinicOpeningHours, ClinicOption } from "@prisma/client";
import { OpeningHoursTable } from "components/molecules/table/OpeningHoursTable";
import { useRouter } from "next/router";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import { newOptionFunc } from "services/app/etc/etc";
import { getRandomImg } from "services/app/resources/SearchSalonHooks";
import { ClinicNestPriceDto } from "types/api/dto/ClinicNestPriceDto";
import { OptionText } from "types/app/OptionText";
import { NoticeClinicDetail } from "../box/NoticeClinicDetail";
import { FreeServiceBoxList } from "../lists/FreeServiceBoxList";
import { PayRerationsBoxList } from "../lists/PayRerationsBoxList";

type Props = {
  clinic: ClinicNestPriceDto;
};

const take = 10;
const skip = 2;

export const ClinicCard: FC<Props> = (props) => {
  const { clinic } = props;
  const router = useRouter();
  // const { checkFreeOption, newOptionFunc } = SalonListHook();
  // const { getPriceByClinicId } = PriceApi();
  // const { getRandomImg } = SearchSalonHooks();

  // const [additionalPrice, setAdditionalPrice] = useState<PriceDto[]>([]);
  const [payment, setPayment] = useState<OptionText[]>([]);
  const [detailViewState, setDetailViewState] = useState<boolean>(false);
  const [detailViewClass, setDetailViewClass] =
    useState<string>("defaultDisplayNone");
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

  // メニューにプライスを表示
  // const getApiPrice = useCallback(
  //   async (clinicId: string) => {
  //     const query: PagenationParameter = { take, skip };
  //     const data = await getPriceByClinicId(clinicId, query);
  //     setAdditionalPrice(data);
  //   },
  //   [getPriceByClinicId]
  // );

  // const detailOpen = useCallback(
  //   async (clinicId: string) => {
  //     if (additionalPrice.length === 0) {
  //       await getApiPrice(clinicId);
  //     }
  //     if (!detailViewState) {
  //       setDetailViewClass("detailServiceOpenClinic");
  //     } else {
  //       setDetailViewClass("detailServiceCloseClinic");
  //     }
  //     setDetailViewState(!detailViewState);
  //   },
  //   [detailViewState, additionalPrice, getApiPrice]
  // );

  return (
    clinic && (
      <Box
        p={"1rem"}
        borderRadius={8}
        shadow={"0 4px 8px 2px rgb(180,180,180)"}
        color={"#333"}
      >
        <HStack
          // minH={"15rem"}
          wrap={"wrap"}
          justifyContent={{ md: "space-evenly", sm: "center" }}
          alignItems={"flex-start"}
          spacing={"0"}
        >
          <Box h={"100%"} w={"22rem"} textAlign={"left"}>
            <Box pb={"2px"} pl={"8px"} fontSize={"1.1em"} fontWeight={"bold"}>
              {clinic.name}
            </Box>
            <Flex wrap={{ md: "wrap", sm: "nowrap" }} overflow={"scroll"}>
              <Image maxH={"80%"} src={image[0]} alt={"クリニック画像"} />
              <Image
                maxH={"80%"}
                mt={{ md: "5px", sm: "0" }}
                src={image[1]}
                alt={"クリニック画像-2"}
              />
            </Flex>
          </Box>
          <Stack
            spacing={"0"}
            // w="13.3rem"
            // w={{
            //   md: "30rem",
            //   sm: "inherit",
            //   // sm: "100%"
            // }}
            maxW={{
              md: "30rem",
              sm: "100%",
            }}
            mt={"1rem"}
            px={"1em"}
            py={"1em"}
            justifyContent={"center"}
          >
            <NoticeClinicDetail clinic={clinic} width={"46%"} py={"8px"} />
            <Box
              w="100%"
              fontSize={"0.8em"}
              textAlign={"left"}
              py={"1em"}
              pl={"1em"}
            >
              <Text>念の為、公式ホームページのご確認をお願い致します。</Text>
              <Text>掲載情報に相違がある場合がございます。</Text>
            </Box>
            <Box maxW={"100%"} mt={"1em"}>
              <Box>
                <Text
                  textAlign={"left"}
                  fontSize={"0.9em"}
                  color={"originBlack"}
                  fontWeight={"bold"}
                >
                  オプションサービス
                </Text>
              </Box>
              <Flex wrap={"nowrap"} overflow={"scroll"}>
                {clinic.clinicOption && (
                  <FreeServiceBoxList clinicOption={clinic.clinicOption} />
                )}
              </Flex>
            </Box>

            {payment && (
              <Box>
                <Box>
                  <Text
                    textAlign={"left"}
                    fontSize={"0.9em"}
                    color={"originBlack"}
                    fontWeight={"bold"}
                  >
                    契約/支払い
                  </Text>
                </Box>
                <Flex wrap={"nowrap"} overflow={"scroll"}>
                  <PayRerationsBoxList payments={payment} />
                </Flex>
              </Box>
            )}
            <Box w={"100%"} justifyContent={"left"} alignItems={"center"}>
              <Box w="100%" textAlign={"left"}>
                <Text
                  fontSize={"0.9em"}
                  color={"originBlack"}
                  fontWeight={"bold"}
                >
                  診察時間
                </Text>
              </Box>
              <Box mt={"3px"} overflow={"scroll"} w={{ md: "25em", sm: "95%" }}>
                <OpeningHoursTable datas={clinic.clinicOpeningHours} />
              </Box>
            </Box>
            <Flex alignItems={"center"} w={"100%"} mt={"1em !important"}>
              <Text
                fontSize={"0.9em"}
                color={"originBlack"}
                fontWeight={"bold"}
                mr={"1rem"}
                alignItems={"center"}
              >
                アクセス
              </Text>
              <Text fontSize={"0.8rem"} textAlign={"left"}>
                {clinic.nearestStation}
              </Text>
            </Flex>
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
                  onClick={() => router.push(`/clinic/${clinic.id}`)}
                >
                  詳細
                </Button>
              </Box>
            </Flex>
          </Stack>
        </HStack>
        {/* <Flex wrap={"wrap"} justifyContent={"space-evenly"}>
        {clinic.prices.map((data, int) => (
          <Box w={"22rem"} m={{ md: "0.5rem", sm: "0.3rem 0" }} key={int}>
            <SmallPlanCard price={data} />
          </Box>
        ))}
      </Flex>
      <Box className={detailViewClass}>
        <Flex wrap={"wrap"} justifyContent={"space-evenly"}>
          {additionalPrice.map((data, int) => (
            <Box w={"22rem"} m={{ md: "0.5rem", sm: "0.3rem 0" }} key={int}>
              <SmallPlanCard price={data} />
            </Box>
          ))}
        </Flex>
      </Box>
      <Link
        display={"inline-block"}
        fontSize={"0.7rem"}
        onClick={() => detailOpen(clinic.id)}
      >
        {detailViewState ? "閉じる" : "もっと見る"}
      </Link> */}
      </Box>
    )
  );
};
