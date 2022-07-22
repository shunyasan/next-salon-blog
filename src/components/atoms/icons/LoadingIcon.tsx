import { Box, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

export const LoadingIcon: FC = () => {
  return (
    <Box
      pos="fixed"
      bgColor={"rgba(30,30,30,0.5)"}
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex={"200"}
    >
      <Box pos="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
        <Spinner size="xl" color="originWhite" />
      </Box>
    </Box>
  );
};
