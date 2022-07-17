import { Box, Button, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { PriceDto } from "types/PriceDto";
import { TitleValue } from "types/app/TitleValue";
import { PairDataRowBoxList } from "../lists/PairDataRowBoxList";
import { UnderLineItemBox } from "components/molecules/box/UnderLineItemBox";
import { StaffGenderText } from "components/atoms/text/StaffGenderText";
import { Icon } from "@chakra-ui/icons";
import { MdClose } from "react-icons/md";

type Props = {
  price: PriceDto;
  // clinic: Clinic & {
  //   clinicOpeningHours: ClinicOpeningHours[];
  // };
  url: string;
  options: TitleValue[];
  isOpen: boolean;
  onClose: () => void;
};

export const PlanDetailModal: FC<Props> = (props) => {
  const { price, url, options, isOpen, onClose } = props;
  // const { ClinicOptionTitleValue } = ClinicDetailHooks();
  // //テスト時のみ
  // const { getRandomImg } = SearchSalonHooks();
  // const history = useHistory();
  const router = useRouter();

  const values: TitleValue[] = [
    {
      title: "総額",
      value: price.price.toLocaleString(),
    },
    {
      title: "1回分",
      value: price.oncePrice.toLocaleString(),
    },
  ];

  // const [otherData, setOtherData] = useState<TitleValue[]>();
  // const [optionData, setOptionData] = useState<TitleValue[]>();
  // const [paymentData, setPaymentData] = useState<TitleValue[]>();

  // const [image, setImage] = useState<string[]>([]);

  // useEffect(() => {
  //   const gets = [...Array(2)].map(() => getRandomImg());
  //   setImage(gets);
  // }, []);
  // //

  return (
    <Box
      width="100%"
      height="100%"
      position="fixed"
      top="0"
      left="0"
      visibility={isOpen ? "visible" : "hidden"}
      // onClick={onClose}
      zIndex="100"
      bg="rgba(30,30,30,0.5)"
    >
      {/* クリニック情報は重複するから入れない  
      部位の施術範囲とか常々情報が変わるものを入れる*/}
      <Box
        pt="1em"
        px={{ md: "3rem", sm: "1.5rem" }}
        bg="originWhite"
        w={{ md: "70%", sm: "95%" }}
        h="90%"
        mx="auto"
        my="2rem"
        overflow={"scroll"}
      >
        <Flex justifyContent={"right"} pos="sticky" top="0">
          <Icon
            cursor={"pointer"}
            fontSize={"2em"}
            textAlign={"right"}
            as={MdClose}
            onClick={onClose}
            bg="originWhite"
          />
        </Flex>
        <Stack spacing={"2em"} mb="2rem">
          <UnderLineItemBox fontSize="1.2em" title={"部位・回数"}>
            <Text textAlign="center" fontSize={"1.5em"}>
              {price.name}
            </Text>
            {/* <Flex
              // fontSize={"1.3rem"}
              w={{ md: "50%", sm: "100%" }}
              mb="2em"
              justifyContent={"space-between"}
            >
              <Text w="50%" fontWeight={"bold"}>
                {data.title}
              </Text>
              <Text w="50%" textAlign={"left"}>
                ￥{data.value}
              </Text>
            </Flex> */}
          </UnderLineItemBox>
          <UnderLineItemBox fontSize="1.2em" title={"セット回数"}>
            <Text textAlign="center" fontSize={"1.5em"}>
              {price.times}回
            </Text>
          </UnderLineItemBox>
          <UnderLineItemBox fontSize="1.2em" title={"対象"}>
            <Box textAlign="center" fontSize={"1.5em"}>
              <StaffGenderText staffGender={price.gender} />
            </Box>
          </UnderLineItemBox>
          <UnderLineItemBox fontSize="1.2em" title={"料金"}>
            <Flex justifyContent={"space-between"} wrap={"wrap"} mb="-2em">
              {/* <PairDataBoxList datas={values} /> */}
              {values.map((data, i) => (
                <Flex
                  key={i}
                  fontSize={"1.3rem"}
                  w={{ md: "50%", sm: "100%" }}
                  mb="2em"
                  justifyContent={"space-between"}
                >
                  <Text w="50%" fontWeight={"bold"}>
                    {data.title}
                  </Text>
                  <Text w="50%" textAlign={"left"}>
                    ￥{data.value}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </UnderLineItemBox>
          <UnderLineItemBox fontSize="1.2em" title={"オプションサービス"}>
            <Flex justifyContent={"center"} pl={{ md: "2em", sm: ".5em" }}>
              <PairDataRowBoxList
                datas={options}
                fontSize={"1.1em"}
                my={{ md: "1em", sm: "0.8em" }}
              />
            </Flex>
          </UnderLineItemBox>
        </Stack>
        <Box
          mt={{ md: "0", sm: "1.5em" }}
          py="1em"
          pos="sticky"
          bottom={"0"}
          bg="originWhite"
        >
          <Link
            w="30%"
            href={url || ""}
            _hover={{ textDecoration: "none" }}
            _focus={{ outline: "none" }}
            isExternal
          >
            <Button
              size={"lg"}
              px={{ md: "4em", sm: "2em" }}
              // w={{ md: "inherit", sm: "70%" }}
              variant="base"
            >
              <Text w="100%" as="span">
                もっと詳しく
              </Text>
              <Text w="100%" as="span" fontSize={".6em"}>
                (外部リンク)
              </Text>
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
