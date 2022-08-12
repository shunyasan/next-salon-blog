import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { FC } from "react";

const clinicDefoultNum = "86";
const planDefoultNum = "6064";

type Props = {};
export const NumOfDatasBox: FC<Props> = (props) => {
  return (
    <Box
      // spacing={"0"}
      // justifySelf={"center"}
      textAlign="center"
      bg={"#eee"}
      p={{ md: "1rem 2rem", sm: ".5rem" }}
      h="100%"
      fontSize={{ md: "0.6vw", sm: ".8rem" }}
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
        <Text>東京都内のクリニックから</Text>
        <Text>プランを分析</Text>
      </Flex>
      <HStack
        justifyContent={"center"}
        alignItems={"center"}
        spacing={{ md: "2rem", sm: "1.5em" }}
      >
        <Text fontSize={{ md: "1.2vw", sm: "0.8rem" }}>現在</Text>
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
  );
};
