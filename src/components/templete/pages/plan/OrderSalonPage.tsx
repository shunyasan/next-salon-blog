import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/layout";
import { CompleteBadge } from "components/atoms/badge/CompleteBadge";
import { useRouter } from "next/router";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { createQueryString } from "services/app/parameter/CreateParameterHooks";
import { PageQuery } from "types/app/PageQuery";
import style from "../../../../../styles/Home.module.css";

type Props = {
  children: ReactNode;
  showPage: number;
  // prePage: string;
  // query?: string;
};

const OrderSalonPage: FC<Props> = (props) => {
  const { showPage, children } = props;

  const router = useRouter();

  const [query, setQuery] = useState<string>();

  // const getQuery = () => {
  //   const queryString = createQueryString(router.query);
  //   const decode = decodeURI(queryString);
  //   return decode;
  // };

  useEffect(() => {
    const queryString = createQueryString(router.query);
    setQuery(queryString);
  }, [router]);

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
              anime={i === showPage ? style.showBadge : style.badgeDesign}
            />
          ))}
        </HStack>
      </Box>
      {children}
      <Center m="2em">
        {/* <Button
          as="a"
          mx="7"
          href={`/plan/${prePage}?${query}`}
          variant={"secBase"}
        >
          戻る
        </Button> */}
        <Button as="a" variant={"secBase"} href="/plan">
          最初からやり直す
        </Button>
      </Center>
      {/* <Adsense /> */}
    </Box>
  );
};
export default OrderSalonPage;
