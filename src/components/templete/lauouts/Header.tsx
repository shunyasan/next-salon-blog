import { FC, memo, ReactNode, useEffect, useState, VFC } from "react";
import {
  Box,
  Flex,
  Text,
  Link,
  useDisclosure,
  HStack,
  Button,
  IconButton,
  Center,
  Stack,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { Logo } from "../../atoms/logos/Logo";
import { HamburgerIcon } from "../../atoms/icons/HamburgerIcon";
import { HeaderDrawer } from "../../molecules/drawers/HeaderDrawer";
import { GenderPlateBox } from "components/molecules/box/GenderPlateBox";

type Props = {
  // children?: ReactNode;
  // topPage?: boolean;
  // getGender: (gender: string) => void;
};

const clinicDefoultNum = "349";
const planDefoultNum = "32442";

export const Header: FC<Props> = (props) => {
  const {
    // getGender,
    // children, topPage,
  } = props;
  // const [clinicMeterTrigger, setClinicMeterTrigger] = useState<boolean>(false);
  // const [planMeterTrigger, setPlanMeterTrigger] = useState<boolean>(false);
  // const [clinicNum, setClinicNum] = useState<string>(clinicDefoultNum);
  // const [planNum, setPlanNum] = useState<string>(planDefoultNum);
  const [gender, setGender] = useState<string>("女性");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const datas = [
    {
      path: "",
      text: "TOP",
    },
    {
      path: "plan",
      text: "プランを探す",
    },
    {
      path: "treatment-parts",
      text: "部位一覧",
    },
    {
      path: "clinic/1",
      text: "クリニック一覧",
    },
  ];

  const profiles = [
    // {
    //   path: "#",
    //   text: "掲載クリニック様へ",
    // },
    {
      path: "/information/profile",
      text: "運営者情報",
    },
    {
      path: "/information/form",
      text: "お問い合わせ",
    },
    {
      path: "/information/policy",
      text: "プライバシーポリシー",
    },
  ];

  const onClickTransition = (path: string) => {
    onClose();
    router.push(`/${path}`);
  };

  const changeGenderState = useCallback(
    (genderParam: string) => {
      if (gender !== genderParam) {
        // getGender(genderParam);
        // setGender(genderParam);
        router.push({
          pathname: router.pathname,
          query: { ...router.query, ge: genderParam },
        });
      }
    },
    [gender, router]
  );

  useEffect(() => {
    const gender: string = router.query.ge as string;
    setGender(gender || "女性");
  }, [router]);

  // クリニック数のカウンター
  // useEffect(() => {
  //   if (topPage) {
  //     setClinicMeterTrigger(true);
  //     setPlanMeterTrigger(true);
  //     setTimeout(() => {
  //       setClinicMeterTrigger(false);
  //     }, 2000);
  //     setTimeout(() => {
  //       setPlanMeterTrigger(false);
  //     }, 3000);
  //   }
  // }, [topPage]);

  // useEffect(() => {
  //   if (topPage) {
  //     const random = [...Array(5)].map(() =>
  //       Math.floor(Math.random() * 10).toString()
  //     );
  //     const clinicRandom = random.slice(0, 3);
  //     const planRandom = random.slice(0, 5);

  //     if (clinicMeterTrigger) {
  //       setClinicNum(clinicRandom.join(""));
  //     } else {
  //       setClinicNum(clinicDefoultNum);
  //     }
  //     if (planMeterTrigger) {
  //       setPlanNum(planRandom.join(""));
  //     } else {
  //       setPlanNum(planDefoultNum);
  //     }
  //   }
  // }, [clinicMeterTrigger, planMeterTrigger, topPage, clinicNum, planNum]);

  return (
    <Box as="header">
      <Box pos="relative" zIndex={1}>
        <Box>
          <HStack
            // wrap={"wrap"}
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={"0"}
            w={{ md: "inherit", sm: "100%" }}
          >
            <Link
              href="/"
              _hover={{
                textDecoration: "none",
              }}
              // w={{ md: "inherit", sm: "100%" }}
              minW={{ md: "11rem", sm: "11rem" }}
              // my={{ md: "1rem", sm: "0" }}
              mx={{ md: "2rem", sm: ".5em" }}
              _focus={{ outline: "none" }}
            >
              <Flex justifyContent={"center"}>
                <Logo
                  fontSize={{ md: "2.4vw", sm: "1.19em" }}
                  color={"originBlack"}
                />
              </Flex>
            </Link>
            <Flex alignItems={"center"}>
              <HStack
                as="nav"
                // bg="originBlack"
                // color="originWhite"
                // h={"4rem"}
                spacing={"1.5em"}
                fontSize="1vw"
                alignItems={"center"}
                justifyContent={"center"}
                wrap={"wrap"}
                display={{ md: "flex", sm: "none" }}
                mr="1.5em"
              >
                {profiles.map((data, i) => (
                  <Box
                    key={i}
                    as="a"
                    my=".5em"
                    // w={{ md: "15%", sm: "60%" }}
                    cursor="pointer"
                    _hover={{
                      transition: "0.5s",
                      backgroundColor: "rgba(220,220,220,0.2)",
                    }}
                    href={`/${data.path}`}
                    // onClick={() => onClickPush(data.path)}
                  >
                    {data.text}
                  </Box>
                ))}
              </HStack>

              <Box
                // spacing={"0"}
                // justifySelf={"center"}
                textAlign="center"
                bg={"#eee"}
                p={{ md: "1rem 2rem", sm: " 1rem .5rem" }}
                h="100%"
                fontSize={{ md: "0.6vw", sm: "0.4rem" }}
                // minW="13rem"
                // fontSize={{ md: "0.6rem", sm: "0.4rem" }}
                // marginInlineStart={"unset"}
              >
                <Flex
                  justifyContent={"center"}
                  wrap={"wrap"}
                  mb={"0.5rem"}
                  color={"originGold"}
                >
                  <Text>東京都激戦５区のクリニックから</Text>
                  <Text>ほぼ全てのプランを分析</Text>
                </Flex>
                <HStack
                  justifyContent={"center"}
                  alignItems={"center"}
                  spacing={{ md: "2rem", sm: "1.5em" }}
                >
                  <Text fontSize={{ md: "1.2vw", sm: "0.7rem" }}>現在</Text>
                  <Box>
                    <Text>クリニック数</Text>
                    <Text fontSize={{ md: "1.6vw", sm: "1rem" }} mx={"3px"}>
                      {clinicDefoultNum}
                      <Text as="span" fontSize={"0.6rem"} ml={"5px"}>
                        件
                      </Text>
                    </Text>
                  </Box>
                  <Box>
                    <Text>プラン数</Text>
                    <Text fontSize={{ md: "1.6vw", sm: "1rem" }} mx={"3px"}>
                      {planDefoultNum}
                      <Text as="span" fontSize={"0.6rem"} ml={"5px"}>
                        件
                      </Text>
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </Flex>
          </HStack>
          {/* <Box py={"0.5em"} display={{ md: "none", sm: "block" }}>
            <GenderPlateBox
              gender={gender}
              onClick={(gender: string) => changeGenderState(gender)}
            />
          </Box> */}
          <Box as="nav" w={"100%"}>
            <HStack
              alignItems={"center"}
              py={"1.3rem"}
              fontSize="0.8rem"
              bg="originBlack"
              color="originWhite"
              pl={"1rem"}
              display={{ md: "flex", sm: "none" }}
            >
              {datas.map((data, i) => (
                <Text
                  as="a"
                  textAlign="center"
                  px={"1.3rem"}
                  py={"0.1rem"}
                  cursor="pointer"
                  href={`/${data.path}`}
                  // onClick={() => onClickTransition(data.path)}
                  _hover={{
                    transition: "0.5s",
                    backgroundColor: "rgba(220,220,220,0.2)",
                  }}
                  key={i}
                >
                  {data.text}
                </Text>
              ))}
            </HStack>
          </Box>
        </Box>
        <Box
          // justifyContent={"center"}
          cursor={"pointer"}
          bg="originBlack"
          _hover={{ transition: "1s", opacity: 0.8 }}
          // _hover={{ transition: "1s", bg: "originLiteBlack" }}
          display={{ md: "none", sm: "block" }}
          onClick={onOpen}
        >
          <Flex justifyContent={"center"}>
            <HamburgerIcon />
          </Flex>
        </Box>
        {/* <DropHeader anime={dropHeader} /> */}
      </Box>
      <HeaderDrawer
        isOpen={isOpen}
        onClose={onClose}
        onClick={(path: string) => onClickTransition(path)}
      />
    </Box>
  );
};
