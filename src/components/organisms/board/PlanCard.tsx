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
import { PriceDto } from "types/api/dto/PriceDto";
import { OptionText } from "types/app/OptionText";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { FreeServiceBoxList } from "../lists/FreeServiceBoxList";
import { PayRerationsBoxList } from "../lists/PayRerationsBoxList";
import { PlanDetailModal } from "../modal/PlanDetailModal";
import { NoticeClinicDetail } from "../box/NoticeClinicDetail";

type Props = {
  plan: PriceDto;
  orderDataIdName: OrderPlanIdName;
};
export const PlanCard: FC<Props> = (props) => {
  const { plan, orderDataIdName } = props;
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
    const clinicOption = newOptionFunc(plan.clinic);
    setOptionService(clinicOption.service);
    setMedicalFee(clinicOption.medicalFee);
    setPayment(clinicOption.payment);
  }, [plan]);

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
      py={"1rem"}
      // my={"1rem"}
      borderRadius={8}
      shadow={"0 4px 8px 2px rgb(180,180,180)"}
      color={"#333"}
      // border="2px"
      // borderColor="#00188b"
    >
      <HStack
        // minH={"15rem"}
        wrap={"wrap"}
        justifyContent={"center"}
        // justifyContent={{ md: "space-evenly", sm: "center" }}
        alignItems={"flex-start"}
        spacing={"0"}
      >
        <Box h={"100%"} w={"22rem"} textAlign={"left"}>
          <Box pb={"2px"} pl={"8px"} fontSize={"1.1em"} fontWeight={"bold"}>
            {plan.clinic.name}
          </Box>
          <Flex wrap={{ md: "wrap", sm: "nowrap" }} overflow={"scroll"}>
            <Image alt={"クリニック画像"} maxH={"80%"} src={image[0]} />
            <Image
              alt={"クリニック画像-2"}
              maxH={"80%"}
              mt={{ md: "5px", sm: "0" }}
              src={image[1]}
            />
          </Flex>
        </Box>
        <Stack
          spacing={"0"}
          // w="13.3rem"
          w={{ md: "30rem", sm: "100%" }}
          mt={"1rem"}
          px={"1em"}
        >
          <Text fontSize={"0.9rem"}>{plan.name}</Text>
          <Box my={"5px"}>
            <Box>
              <Text as={"a"} fontSize={"0.4rem"}>
                ({plan.clinic.tax || "不明"})
              </Text>
              {orderDataIdName.paySystem.id !== "総額" ? (
                <>
                  <Text as={"a"} fontSize={{ md: "1.8rem", sm: "1.5rem" }}>
                    ￥{plan.oncePrice.toLocaleString()}
                  </Text>
                  <Text as={"a"}>/回</Text>
                </>
              ) : (
                <>
                  <Text as={"a"} fontSize={{ md: "1.8rem", sm: "1.5rem" }}>
                    ￥{plan.price.toLocaleString()}
                  </Text>
                  {/* <Text as="a">({plan.times}回)</Text> */}
                </>
              )}
            </Box>
            <Box fontSize={"0.7rem"}>
              {orderDataIdName.paySystem.id !== "総額" ? (
                <>
                  <Text as="a">総額</Text>
                  <Text as="a">￥{plan.price.toLocaleString()}</Text>
                  {/* <Text as="a">({plan.times}回)</Text> */}
                </>
              ) : (
                <>
                  <Text as="a">￥{plan.oncePrice.toLocaleString()}</Text>
                  <Text as={"a"}>/回</Text>
                </>
              )}
            </Box>
          </Box>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            // borderTop={"1px"}
            // borderColor={"originGray"}
            textAlign={"left"}
            py={"8px"}
          >
            <Text
              color={"originLiteBlack"}
              fontWeight={"bold"}
              // w={"3.5rem"}
              fontSize={"0.8em"}
              px={"1em"}
            >
              回数
            </Text>
            <Text px={"1em"}>{plan.times}回</Text>
          </Flex>
          <Box mt={"1em"}>
            <NoticeClinicDetail clinic={plan.clinic} width={"46%"} py={"8px"} />
          </Box>
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
          <Box w={"100%"} mt={"1em"}>
            <Box textAlign={"left"}>
              <Text
                fontSize={"0.9em"}
                color={"originBlack"}
                fontWeight={"bold"}
                // color={"originWhite"}
                // bg={"originBlack"}
                // display={"inline-block"}
              >
                オプションサービス
              </Text>
            </Box>
            <Flex wrap={"nowrap"} overflow={"scroll"}>
              <FreeServiceBoxList clinicOption={plan.clinic.clinicOption} />
            </Flex>
          </Box>
          {payment && (
            <Box w={"100%"}>
              <Box textAlign={"left"}>
                <Text
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
            <Box mt={"3px"} overflow={"scroll"} w={{ md: "20em", sm: "95%" }}>
              <OpeningHoursTable datas={plan.clinic.clinicOpeningHours} />
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
              {plan.clinic.nearestStation}
            </Text>
          </Flex>
          <Box>
            <Link
              href={plan.clinic.url}
              _hover={{ textDecoration: "none" }}
              _focus={{ outline: "none" }}
              isExternal
            >
              <Button my={"1rem"} mx={"1.5rem"} size={"lg"} variant="base">
                公式サイト
              </Button>
            </Link>
            <Button
              my={"1rem"}
              mx={"1.5rem"}
              size={"lg"}
              variant={"secBase"}
              onClick={onOpen}
            >
              詳細を開く
            </Button>
          </Box>
        </Stack>
      </HStack>
      <PlanDetailModal
        isOpen={isOpen}
        onClose={onClose}
        price={plan}
        clinic={plan.clinic}
        clinicButton={true}
      />
    </Box>
  );
};
