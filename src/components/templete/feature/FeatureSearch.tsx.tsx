import { Box, Text, Flex } from "@chakra-ui/layout";
import { ClinicCard } from "components/organisms/board/ClinicCard";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import fetcher from "services/orm/fetcher";
import useSWR from "swr";
import { ClinicNestPriceDto } from "types/api/dto/ClinicNestPriceDto";
import { TopResource } from "../../../../resorces/TopResource";
import { Pagenation } from "../pagenation/Pagenation";

type Props = {
  title: string;
  take: number;
  clinicData: ClinicNestPriceDto[];
  maxData: number;
  pagenationData: { now: number; block: number };
  getPageNumber: (page: number, block?: number) => void;
};

export const FeatureSearch: FC<Props> = (props) => {
  const { title, take, clinicData, maxData, pagenationData, getPageNumber } =
    props;

  return (
    <Box textAlign={"center"}>
      <Box
        bgImage={TopResource.topImg}
        bgSize={"cover"}
        minH={"20rem"}
        // my={"3rem"}
        // mx={{ md: "3rem", sm: "1rem" }}
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w="100%"
          minH={"20rem"}
          backdropFilter="auto"
          backdropBlur="8px"
          color={"originWhite"}
          fontSize={"1.6rem"}
        >
          {title}
        </Flex>
      </Box>
      <Pagenation
        max={maxData}
        take={take}
        nowPage={pagenationData.now}
        pageBlock={pagenationData.block}
        onClickNumber={(page: number, block?: number) =>
          getPageNumber(page, block)
        }
      >
        {/* <Box mt={"2rem"}>
          <Checkbox colorScheme="yellow" value={}>系列クリニックをまとめる</Checkbox>
        </Box> */}
        <Box w={{ md: "80%", sm: "95%" }} m="auto">
          {clinicData.map((data, int) => (
            <ClinicCard clinic={data} key={int} />
          ))}
        </Box>
      </Pagenation>
    </Box>
  );
};
