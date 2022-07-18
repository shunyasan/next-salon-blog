import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Logo } from "components/atoms/logos/Logo";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import TitleAndValueBox from "components/molecules/box/TitleAndValueBox";
import { NextPage } from "next";
import Head from "next/head";

const Profile = () => {
  return (
    <Box>
      <Head>
        <title>運営者情報・お問い合わせ | 脱毛コンサルタント</title>
      </Head>
      <Box textAlign={"center"}>
        <BgImgH1 title="運営者情報・お問い合わせ" />
        <Box my="3rem">
          <Logo fontSize={{ md: "3rem", sm: "2rem" }} color={"originBlack"} />
        </Box>
      </Box>
      <Stack
        fontSize={{ md: "1rem", sm: ".9rem" }}
        p={"2rem"}
        textAlign={"center"}
        mx="auto"
        maxW={{ md: "40rem", sm: "30rem" }}
        spacing={"1rem"}
      >
        <TitleAndValueBox
          title={"運営元"}
          value={"脱毛コンサルタント 運営事務局"}
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
      </Stack>
    </Box>
  );
};

export default Profile;
