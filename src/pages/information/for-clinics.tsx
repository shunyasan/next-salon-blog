import { Box, Center, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";

const ForClinics = () => {
  return (
    <>
      <Head>
        <title>クリニック様へ | 脱毛コンサルタント</title>
      </Head>
      <Flex justifyContent={"center"} p={"2rem"} minH={"20rem"}>
        <Text>掲載クリニック様へ</Text>
        <Box textAlign={"center"}>
          <Text my={"1rem"}>テスト</Text>
        </Box>
      </Flex>
    </>
  );
};

export default ForClinics;
