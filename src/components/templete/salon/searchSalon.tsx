import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/layout";
import { CompleteBadge } from "components/atoms/badge/CompleteBadge";
import { useRouter } from "next/router";
import React, { FC, ReactNode } from "react";

type Props = {
  showPage: number;
  children: ReactNode;
};

const SearchSalon: FC<Props> = (props) => {
  const { showPage, children } = props;
  const router = useRouter();

  const transitionTop = () => {
    router.push("/salon");
  };

  return (
    <Box>
      <Box textAlign="center" m={8}>
        <Center my={"1rem"} fontSize={"1.5rem"}>
          プランを探す
        </Center>
        <HStack justifyContent={"center"} wrap={"wrap"}>
          {[...Array(7)].map((_, i) => (
            <CompleteBadge
              key={i}
              number={i + 1}
              selected={showPage >= i}
              mx={"5px"}
              circle={{ md: "2.5rem", sm: "2rem" }}
            />
          ))}
        </HStack>
      </Box>
      {children}
      <Center m="2em">
        <Button variant={"secBase"} onClick={transitionTop}>
          最初からやり直す
        </Button>
      </Center>
      {/* <Adsense /> */}
    </Box>
  );
};
export default SearchSalon;
