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
import { GiHamburgerMenu } from "react-icons/gi";
import { LoadingModalIcon } from "components/atoms/icons/LoadingModalIcon";
import { SelextGenderBox } from "components/molecules/box/SelextGenderBox";
import { Gender } from "types/Gender";
import { NumOfDatasBox } from "components/molecules/box/NumOfDatasBox";

type Props = {
  // children?: ReactNode;
  // topPage?: boolean;
  // getGender: (gender: string) => void;
};

const clinicDefoultNum = "86";
const planDefoultNum = "6064";

export const Header: FC<Props> = (props) => {
  const {
    // getGender,
    // children, topPage,
  } = props;
  // const [clinicMeterTrigger, setClinicMeterTrigger] = useState<boolean>(false);
  // const [planMeterTrigger, setPlanMeterTrigger] = useState<boolean>(false);
  // const [clinicNum, setClinicNum] = useState<string>(clinicDefoultNum);
  // const [planNum, setPlanNum] = useState<string>(planDefoultNum);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const gender = (router.query.gender as Gender) || "lady";

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
      path: "information/profile",
      text: "運営者情報",
    },
    {
      path: "information/form",
      text: "お問い合わせ",
    },
    {
      path: "information/policy",
      text: "プライバシーポリシー",
    },
  ];

  const onClickTransition = (path: string) => {
    onClose();
    router.push(`/${gender}/${path}`);
  };

  return (
    <Box as="header">
      <LoadingModalIcon />
      <Box>
        <Box>
          <Box display={{ md: "none", sm: "box" }}>
            <NumOfDatasBox />
          </Box>
          <Flex
            // wrap={"wrap"}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={{ md: "inherit", sm: "100%" }}
            h={{ md: "inherit", sm: "5em" }}
            // display={{ md: "flex", sm: "block" }}
            // bg={{ md: "originWhite", sm: "originBlack" }}
          >
            <Link
              href={`/${gender}`}
              _hover={{
                textDecoration: "none",
              }}
              // w={{ md: "inherit", sm: "100%" }}
              minW={"11rem"}
              // my={{ md: "1rem", sm: "0" }}
              mx={"1em"}
              _focus={{ outline: "none" }}
            >
              <Logo
                fontSize={{ md: "2.4vw", sm: "1.4em" }}
                color={"originBlack"}
              />
            </Link>
            <Flex
              // p="1em"
              // w="8em"
              h="100%"
              cursor={"pointer"}
              bg="originBlack"
              color="originWhite"
              alignItems={"center"}
              justifyContent="space-between"
              pt="7px" //黒下線に合わせて調整
              pl="4vw" //Hamburgerに合わせて調整
              // _hover={{ transition: "1s", opacity: 0.8 }}
              // _hover={{ transition: "1s", bg: "originLiteBlack" }}
              display={{ md: "none", sm: "flex" }}
              textAlign="center"
            >
              <SelextGenderBox />
              <HamburgerIcon width="3.5em" onClick={onOpen} />
              {/* <HamburgerIcon /> */}
            </Flex>
            <Flex
              alignItems={"center"}
              display={{ md: "flex", sm: "none" }}
              w={{ md: "inherit", sm: "100%" }}
            >
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
                <SelextGenderBox />
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
                    href={`/${gender}/${data.path}`}
                    // onClick={() => onClickPush(data.path)}
                  >
                    {data.text}
                  </Box>
                ))}
              </HStack>
              <NumOfDatasBox />
            </Flex>
          </Flex>
          <Box h="7px" w="100%" bg="originBlack"></Box>
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
                  href={`/${gender}/${data.path}`}
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
