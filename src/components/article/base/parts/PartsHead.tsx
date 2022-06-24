import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { UnderLineText } from "components/atoms/text/UnderLineText";
import { FC } from "react";

const PartsHead: FC = ({}) => {
  return (
    <Stack
      my={"2rem"}
      spacing={"4rem"}
      // p={{ md: "2rem", sm: "2rem 1rem" }}
      // bg="originWhite"
      w="40rem"
      // h="90%"
      // mx="auto"
      // my="2rem"
      // overflow={"scroll"}
      textAlign={"left"}
    >
      <Text as="h2" fontSize={"1.5rem"} textAlign="center">
        頭部
      </Text>
      <Box>
        <UnderLineText
          fontSize={{ md: "1.2rem", sm: "1rem" }}
          title={"施術範囲"}
        />
        <Text textAlign={"center"}>頭頂部〜髪の毛の生え際</Text>
      </Box>
      <Box>
        <UnderLineText
          fontSize={{ md: "1.2rem", sm: "1rem" }}
          title={"料金相場"}
        />
        <Text textAlign={"center"}>15000円〜</Text>
      </Box>
      <Box>
        <UnderLineText
          fontSize={{ md: "1.2rem", sm: "1rem" }}
          title={"多い悩み"}
        />
        <Text textAlign={"center"}>毛深く見える</Text>
      </Box>
      <Box>
        <UnderLineText
          fontSize={{ md: "1.2rem", sm: "1rem" }}
          title={"脱毛した後"}
        />
        <Text textAlign={"center"}>肌の色が綺麗に見える</Text>
      </Box>
      <Box>
        <UnderLineText
          fontSize={{ md: "1.2rem", sm: "1rem" }}
          title={"完了までの期間"}
        />
        <Text textAlign={"center"}>１ヶ月</Text>
      </Box>
      <Box>
        <UnderLineText fontSize={{ md: "1.2rem", sm: "1rem" }} title={"痛み"} />
        <Text textAlign={"center"}>ちくちく</Text>
      </Box>
    </Stack>
  );
};
export default PartsHead;
