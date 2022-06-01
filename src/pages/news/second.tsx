import { Box, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";

const News2: NextPage = () => {
  return (
    <Box p={"2rem"} w={"80%"} mx={"auto"}>
      <Flex justifyContent={"space-between"}>
        <Text fontSize={"1.4em"}>掲載させて頂いたクリニック様へ</Text>
        <Text>2022/04/10</Text>
      </Flex>
      <Box mt={"2em"}>
        クリニック様 各位 <br /> <br />
        <br />
        当サービス「あなたの脱毛」は脱毛を検討されている全てのお客様に対して、クリニックとのトラブルやアンマッチ解消を掲げてリリースしたサービスです。
        <br />
        <br />
        スタートしたばかりのサービスではございますが、改善に努めてまいりますので是非ご期待ください。
        <br />
        今後とも、どうぞ宜しくお願い致します。
      </Box>
    </Box>
  );
};
export default News2;
