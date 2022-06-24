import {
  Box,
  Button,
  color,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { OpeningHoursTable } from "components/molecules/table/OpeningHoursTable";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import { newOptionFunc } from "services/app/etc/etc";
import { getRandomImg } from "services/app/resources/SearchSalonHooks";
import { PriceDto } from "types/PriceDto";
import { OptionText } from "types/app/OptionText";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { FreeServiceBoxList } from "../lists/FreeServiceBoxList";
import { PayRerationsBoxList } from "../lists/PayRerationsBoxList";
import { PlanDetailModal } from "../modal/PlanDetailModal";
import { NoticeClinicDetail } from "../box/NoticeClinicDetail";
import { PriceDataBox } from "components/molecules/box/PriceDataBox";

type Props = {
  price: PriceDto;
  orderDataIdName: OrderPlanIdName;
};
export const PricePlanCard: FC<Props> = (props) => {
  const { price, orderDataIdName } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [detailViewState, setDetailViewState] = useState<boolean>(false);
  const [detailViewClass, setDetailViewClass] =
    useState<string>("defaultDisplayNone");
  const [optionService, setOptionService] = useState<OptionText[]>();
  const [medicalFee, setMedicalFee] = useState<OptionText[]>();
  const [payment, setPayment] = useState<OptionText[]>();
  const [image, setImage] = useState<string[]>([]);

  useEffect(() => {
    const gets = [...Array(2)].map(() => getRandomImg());
    setImage(gets);
  }, []);
  //

  const OptionFunc = useCallback(() => {
    const clinicOption = newOptionFunc(price.clinic);
    setOptionService(clinicOption.service);
    setMedicalFee(clinicOption.medicalFee);
    setPayment(clinicOption.payment);
  }, [price]);

  const detailOpen = useCallback(() => {
    if (!detailViewState) {
      setDetailViewClass("detailServiceOpen");
    } else {
      setDetailViewClass("detailServiceClose");
    }
    setDetailViewState(!detailViewState);
  }, [detailViewState]);

  useEffect(() => {
    OptionFunc();
  }, [OptionFunc]);

  return (
    <Box
      p={"1rem"}
      borderRadius={8}
      shadow={"0 4px 8px 2px rgb(180,180,180)"}
      color={"#333"}
    >
      <Box
        textAlign={"left"}
        pb={"2px"}
        pl={"8px"}
        fontSize={"1.1em"}
        fontWeight={"bold"}
      >
        {price.clinic.name}
      </Box>
      <HStack
        // minH={"15rem"}
        wrap={"wrap"}
        justifyContent={{ md: "space-evenly", sm: "center" }}
        alignItems={"flex-start"}
        spacing={"0"}
        // fontFamily={"Zen Maru Gothic, sans-serif"}
      >
        <Box h={"100%"} w={"22rem"} textAlign={"left"}>
          {/* <Box pb={"2px"} pl={"8px"} fontSize={"1.1em"} fontWeight={"bold"}>
            {price.clinic.name}
          </Box> */}
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
          <PriceDataBox price={price} orderDataIdName={orderDataIdName} />
          <Flex
            justifyContent={"center"}
            fontSize={"0.8em"}
            textAlign={"left"}
            py=".5em"
          >
            <Stack spacing={"5px"}>
              <Text>念の為、公式ホームページのご確認をお願い致します。</Text>
              <Text>掲載情報に相違がある場合がございます。</Text>
            </Stack>
          </Flex>
          <NoticeClinicDetail clinic={price.clinic} width={"46%"} py={"8px"} />
          <Box pt="1em">
            <Text
              textAlign={"center"}
              color={"originBlack"}
              fontWeight={"bold"}
            >
              オプションサービス
            </Text>
            <Box pl="3rem" mt=".5rem">
              {price.clinic.clinicOption && (
                <FreeServiceBoxList clinicOption={price.clinic.clinicOption} />
              )}
            </Box>
          </Box>
          {payment && (
            <Box>
              <Text
                textAlign={"center"}
                color={"originBlack"}
                fontWeight={"bold"}
              >
                契約/支払い
              </Text>
              <Box pl="3rem" mt=".5rem">
                {/* ↓ オプションサービスと同じ処理にしたい */}
                <PayRerationsBoxList payments={payment} />
              </Box>
            </Box>
          )}
          <Stack
            spacing={"1em"}
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
              <OpeningHoursTable datas={price.clinic.clinicOpeningHours} />
            </Box>
            <Flex fontSize={"0.8em"}>
              <Text color={"originBlack"} mr={"1rem"} alignItems={"center"}>
                最寄り駅
              </Text>
              <Text>{price.clinic.nearestStation}</Text>
            </Flex>
          </Stack>

          <Flex justifyContent={"center"}>
            <Box>
              <Link
                href={price.clinic.url || ""}
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
                as="a"
                my={"1rem"}
                mx={"1.5rem"}
                size={"lg"}
                variant="secBase"
                href={`/clinic/detail/${price.clinic.id}`}
              >
                詳細
              </Button>
            </Box>
          </Flex>
        </Stack>
      </HStack>
      <PlanDetailModal
        isOpen={isOpen}
        onClose={onClose}
        price={price}
        clinic={price.clinic}
        clinicButton={true}
      />
    </Box>
  );
};
