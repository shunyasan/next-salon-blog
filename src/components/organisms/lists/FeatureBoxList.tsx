import { Box, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { CopyrightImageBox } from "components/molecules/box/CopyrightImageBox";
import { GetStaticProps } from "next";
import { FC, useEffect, useState } from "react";
import { Clinic } from "types/api/Clinic";

type Props = {
  clinics: Clinic[];
  onClick: () => void;
  itemWidth: string;
  image: string;
};

export const FeatureBoxList: FC<Props> = (props) => {
  const { clinics, onClick, itemWidth, image } = props;

  return (
    <HStack
      // w={"40rem"}
      spacing={"1em"}
      wrap={"nowrap"}
      overflowX={"scroll"}
    >
      {clinics.map((data, i) => (
        <Box
          minW={itemWidth}
          h={"20em"}
          shadow="xl"
          cursor="pointer"
          onClick={onClick}
          key={i}
        >
          {image && (
            <CopyrightImageBox
              src={image}
              // src={TopResource.clinicImg}
              authority={"urk"}
              fontSize={"0.7em"}
            />
          )}
          <Stack p="1em">
            <Text>{data.name}</Text>
            <Text pt={"0.6em"} fontSize={"0.7em"}>
              {data.nearestStation}
            </Text>
          </Stack>
        </Box>
      ))}
    </HStack>
  );
};
