import { Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";

const Profile = () => {
  return (
    <Flex justifyContent={"center"} p={"2rem"} minH={"30rem"}>
      <Head>
        <title>プロフィール | あなたのための脱毛</title>
      </Head>
      <Stack textAlign={"center"} w={"23rem"} spacing={"1rem"}>
        <Text fontSize={"1.3rem"} mb={"2rem"}>
          運営者情報・問い合わせ先
        </Text>
        <HStack spacing={"0"} w="100%">
          <Text w="35%" bg={"originBlack"} color={"originWhite"} border={"1px"}>
            運営者
          </Text>
          <Text w="65%" border={"1px"}>
            高橋 駿也
          </Text>
        </HStack>
        <HStack spacing={"0"} w="100%">
          <Text w="35%" bg={"originBlack"} color={"originWhite"} border={"1px"}>
            お問合せ
          </Text>
          <Text w="65%" border={"1px"}>
            email
          </Text>
        </HStack>
        {/* <Link href="#" fontSize={"0.8rem"}>
          <Text>プライバシーポリシーはこちら</Text>
        </Link>
        <Link href="/information/for-clinics" fontSize={"0.8rem"}>
          <Text>掲載クリニック様へはこちら</Text>
        </Link> */}
      </Stack>
    </Flex>
  );
};

export default Profile;
