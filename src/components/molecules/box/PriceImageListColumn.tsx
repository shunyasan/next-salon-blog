import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { IdAndNameDto } from "types/IdAndNameDto";
import { PriceForColumn } from "types/PriceForColumn";
import { TopResource } from "../../../../resorces/TopResource";
import { CopyrightImageBox } from "./CopyrightImageBox";

type Props = {
  prices: PriceForColumn[];
};

export const PriceImageListColumn: FC<Props> = ({ prices }) => {
  const router = useRouter();
  return (
    <Flex wrap={"nowrap"} overflowX={"scroll"} my={"1.4em"}>
      {prices.map((data, i) => (
        <Box
          key={i}
          shadow="xl"
          cursor="pointer"
          onClick={() => router.push(`/lady/plan`)}
          pb="1rem"
          m=".5em"
        >
          <Stack textAlign={"center"} mb=".5em" spacing={".1em"}>
            <Text fontWeight={"bold"} fontSize={{ md: ".8em", sm: ".8em" }}>
              {data.priceName}
            </Text>
            <Text fontSize={{ md: "1.4em", sm: "1.4em" }}>¥{data.price}</Text>
          </Stack>
          <CopyrightImageBox
            width={"15rem"}
            height={"10rem"}
            src={TopResource.clinicImg10}
            picture={data.picture}
            // src={TopResource.clinicImg}
            fontSize={{ md: "0.4em", sm: ".7em" }}
          />
          <Stack p={{ md: "1em", sm: ".5em" }}>
            <Text fontSize={{ md: "0.8em", sm: "0.7em" }}>{data.clinic}</Text>
          </Stack>
        </Box>
      ))}
    </Flex>
  );
};
