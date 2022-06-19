import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Logo } from "components/atoms/logos/Logo";
import { HeadingBox } from "components/molecules/box/HeadingBox";
import TitleAndValueBox from "components/molecules/box/TitleAndValueBox";
import { NextPage } from "next";
import Head from "next/head";

const Profile = () => {
  return (
    <Box>
      <Head>
        <title>運営者情報・お問い合わせ | あなたのための脱毛</title>
      </Head>
      <Box textAlign={"center"}>
        <HeadingBox title="運営者情報・お問い合わせ" />
        <Box my="3rem">
          <Logo fontSize={{ md: "3rem", sm: "3rem" }} color={"originBlack"} />
        </Box>
      </Box>
      <Stack
        p={"2rem"}
        textAlign={"center"}
        mx="auto"
        w={"40rem"}
        spacing={"1rem"}
      >
        <TitleAndValueBox
          title={"運営元"}
          value={"あなたのための脱毛 運営事務局"}
        />
        <TitleAndValueBox title={"配信内容"} value={"脱毛プラン検索サービス"} />
        <TitleAndValueBox
          title={"お問合せ"}
          value={"こちら"}
          link={"/information/form"}
        />
        <TitleAndValueBox
          title={"プライバシーポリシー"}
          value={"こちら"}
          link={"/information/policy"}
        />
        {/* <Link href="#" fontSize={"0.8rem"}>
          <Text>プライバシーポリシーはこちら</Text>
        </Link>
        <Link href="/information/for-clinics" fontSize={"0.8rem"}>
          <Text>掲載クリニック様へはこちら</Text>
        </Link> */}
      </Stack>
    </Box>
  );
};

export default Profile;
