import { FC, memo, ReactNode, useEffect, useState } from "react";
import { Box, Flex, Text, Link, useDisclosure, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Logo } from "../../atoms/logos/Logo";
import { Gender } from "types/Gender";

export const Footer: FC = () => {
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

  return (
    <Box as="footer" bg={"originBlack"} mt={"2rem"} py="2rem">
      <Box textAlign={"center"} w={"80%"} mx={"auto"} fontSize="0.9rem">
        <Flex
          as="nav"
          bg="originBlack"
          color="originWhite"
          h={"4rem"}
          alignItems={"center"}
          justifyContent={"space-between"}
          wrap={"wrap"}
        >
          {datas.map((data, i) => (
            <Box
              key={i}
              as="a"
              w={{ md: "inherit", sm: "50%" }}
              // px={"1.3rem"}
              py={"0.2em"}
              cursor="pointer"
              href={`/${data.path}`}
              // onClick={() => onClickPush(data.path)}
              _hover={{
                transition: "0.5s",
                backgroundColor: "rgba(220,220,220,0.2)",
              }}
            >
              {data.text}
            </Box>
          ))}
        </Flex>
        <Box
          w={{ md: "inherit", sm: "100%" }}
          my={{ md: "inherit", sm: "1rem" }}
          mx={"auto"}
        >
          <Link
            href={`/${gender}`}
            textDecoration={"none"}
            _focus={{ outline: "none" }}
          >
            <Logo
              fontSize={{ md: "2rem", sm: "1.6rem" }}
              color={"originWhite"}
            />
          </Link>
        </Box>
        <Flex
          as="nav"
          bg="originBlack"
          color="originWhite"
          // h={{"4rem"}}
          alignItems={"center"}
          justifyContent={"center"}
          wrap={"wrap"}
        >
          {profiles.map((data, i) => (
            <Box
              key={i}
              as="a"
              py=".5em"
              w={{ md: "15%", sm: "60%" }}
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
        </Flex>
      </Box>
    </Box>
  );
};
