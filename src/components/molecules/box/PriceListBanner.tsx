import { Box, Stack, Text } from "@chakra-ui/react";
import { Picture } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import { CopyrightImageBox } from "./CopyrightImageBox";

type Props = {
  srces: Picture[];
};

export const ClinicListBanner: FC<Props> = ({ srces }) => {
  return (
    <Box my={"1.5em"}>
      {srces.map((src, i) => (
        <Box
          key={data.id + i}
          shadow="xl"
          cursor="pointer"
          onClick={() => router.push(`/${gender}/clinic/detail/${data.id}`)}
          pb="1rem"
          m=".5em"
        >
          <CopyrightImageBox
            width={"15rem"}
            height={"10rem"}
            src={imgs[ma_i]}
            picture={data.picture[0]}
            // src={TopResource.clinicImg}
            fontSize={{ md: "0.4em", sm: ".7em" }}
          />
          <Stack p={{ md: "1em", sm: ".5em" }}>
            <Text fontWeight={"bold"} fontSize={{ md: "0.8em", sm: "0.7em" }}>
              {data.name}
            </Text>
            <Text pt={"0.6em"} fontSize={"0.6em"}>
              {data.nearestStation}
            </Text>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};
