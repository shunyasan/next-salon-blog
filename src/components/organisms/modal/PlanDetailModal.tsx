import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { OpeningHoursTable } from "components/molecules/table/OpeningHoursTable";
import { useRouter } from "next/router";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import {
  ClinicOptionTitleValue,
  ClinicOtherTitleValue,
  ClinicPaymentTitleValue,
} from "services/app/clinic/ClinicDetailHooks";
import { getRandomImg } from "services/app/resources/SearchSalonHooks";
import { Clinic } from "types/api/Clinic";
import { PriceDto } from "types/api/dto/PriceDto";
import { TitleValue } from "types/app/TitleValue";
import { NoticeClinicDetail } from "../box/NoticeClinicDetail";
import { PairDataBoxList } from "../lists/PairDataBoxList";
import { PairDataRowBoxList } from "../lists/PairDataRowBoxList";

type Props = {
  price: PriceDto;
  clinic: Clinic;
  isOpen: boolean;
  onClose: () => void;
  clinicButton?: boolean;
};

export const PlanDetailModal: FC<Props> = (props) => {
  const { price, clinic, isOpen, onClose, clinicButton } = props;
  // const { ClinicOptionTitleValue } = ClinicDetailHooks();
  // const { ClinicPaymentTitleValue, ClinicOtherTitleValue } =
  //   ClinicDetailHooks();
  // //テスト時のみ
  // const { getRandomImg } = SearchSalonHooks();
  // const history = useHistory();
  const router = useRouter();

  const [otherData, setOtherData] = useState<TitleValue[]>();
  const [optionData, setOptionData] = useState<TitleValue[]>();
  const [paymentData, setPaymentData] = useState<TitleValue[]>();

  const [image, setImage] = useState<string[]>([]);

  useEffect(() => {
    const gets = [...Array(2)].map(() => getRandomImg());
    setImage(gets);
  }, []);
  //

  useEffect(() => {
    const data = ClinicOptionTitleValue(clinic.clinicOption);
    setOptionData(data);

    const payment = ClinicPaymentTitleValue(clinic);
    setPaymentData(payment);

    const other = ClinicOtherTitleValue(clinic);
    setOtherData(other);
  }, [clinic]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
      <ModalOverlay />
      <ModalContent
        w={"95%"}
        // w={{ md: "", sm: "95%" }}
      >
        <ModalCloseButton />
        <ModalBody p={{ md: "2rem", sm: "2rem 1rem" }}>
          <Box ml={"2rem"} mb={"1em"} textAlign={"left"} fontSize={"1.2em"}>
            {clinic.name}
          </Box>
          <Flex justifyContent={"space-evenly"} wrap={"wrap"}>
            <Box w={"22rem"}>
              <Flex wrap={{ md: "wrap", sm: "nowrap" }} overflow={"scroll"}>
                <Image
                  alt="クリニック画像"
                  objectFit={"contain"}
                  src={image[0]}
                />
                <Image
                  alt="クリニック画像-2"
                  objectFit={"contain"}
                  mt={{ md: "5px", sm: "0" }}
                  src={image[1]}
                />
              </Flex>
            </Box>
            <Box w={{ md: "40rem", sm: "100%" }} pl={{ md: "1em", sm: "0" }}>
              <Stack spacing={"1em"} justifyContent={"center"}>
                <Flex
                  textAlign={"center"}
                  fontWeight={"bold"}
                  fontSize={"1.2em"}
                  justifyContent={"center"}
                  mt={"1em"}
                >
                  <Text mx={".5em"}>{price.name}</Text>
                  <Text mx={".5em"}>{price.times}回</Text>
                </Flex>
                <Box
                  fontWeight={"bold"}
                  textAlign={"left"}
                  borderBottom={"1px"}
                >
                  料金
                </Box>
                <Flex justifyContent={"space-between"}>
                  <Flex w={"45%"} justifyContent={"space-evenly"}>
                    <Text
                    // fontWeight={"bold"}
                    >
                      総額
                    </Text>
                    <Text>{price.price.toLocaleString()}円</Text>
                  </Flex>
                  <Flex w={"45%"} justifyContent={"space-evenly"}>
                    <Text
                    // fontWeight={"bold"}
                    >
                      1回分
                    </Text>
                    <Text>{price.oncePrice.toLocaleString()}円</Text>
                  </Flex>
                </Flex>
                <Box
                  fontWeight={"bold"}
                  textAlign={"left"}
                  borderBottom={"1px"}
                >
                  特徴
                </Box>
                <NoticeClinicDetail
                  clinic={clinic}
                  width={"50%"}
                  py={"5px"}
                  fontSize={{ md: "1rem", sm: "0.9rem" }}
                  border={"0"}
                  fontWeigth={false}
                />
                <Box
                  fontWeight={"bold"}
                  textAlign={"left"}
                  borderBottom={"1px"}
                >
                  オプションサービス
                </Box>
                <Box>
                  {optionData && (
                    <Flex
                      w={"95%"}
                      // w={{ md: "95%", sm: "100%" }}
                      justifyContent={"center"}
                      mx={"auto"}
                    >
                      <PairDataRowBoxList datas={optionData} width={"50%"} />
                    </Flex>
                  )}
                </Box>
                <Box
                  fontWeight={"bold"}
                  textAlign={"left"}
                  borderBottom={"1px"}
                >
                  契約・支払い
                </Box>
                <Box>
                  {paymentData && (
                    <Flex w={"95%"} justifyContent={"center"} mx={"auto"}>
                      <PairDataRowBoxList datas={paymentData} width={"50%"} />
                    </Flex>
                  )}
                </Box>
                <Flex
                  mt={"2rem !important"}
                  overflow={"scroll"}
                  justifyContent={"center"}
                >
                  <Box w={"32em"} display={{ md: "block", sm: "none" }}>
                    <OpeningHoursTable
                      datas={clinic.clinicOpeningHours}
                      size={"sm"}
                    />
                  </Box>
                  <Box w={"95%"} display={{ md: "none", sm: "block" }}>
                    <OpeningHoursTable
                      datas={clinic.clinicOpeningHours}
                      size={"xs"}
                    />
                  </Box>
                </Flex>
                <Box bg={"#eee"} px={"2em"}>
                  {otherData && (
                    <PairDataBoxList
                      datas={otherData}
                      bg={"#eee"}
                      fontSize={".85rem"}
                    />
                  )}
                </Box>
                <Box textAlign={"center"}>
                  <Link
                    href={clinic.url}
                    _hover={{ textDecoration: "none" }}
                    _focus={{ outline: "none" }}
                    isExternal
                  >
                    <Button
                      my={"1rem"}
                      mx={"1.5rem"}
                      size={"lg"}
                      variant="base"
                    >
                      公式サイト
                    </Button>
                  </Link>
                  {clinicButton && (
                    <Button
                      my={"1rem"}
                      mx={"1.5rem"}
                      size={"lg"}
                      variant="secBase"
                      onClick={() => router.push(`/clinic/${clinic.id}`)}
                    >
                      クリニック情報
                    </Button>
                  )}
                </Box>
              </Stack>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
