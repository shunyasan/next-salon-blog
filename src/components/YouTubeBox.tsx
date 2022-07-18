import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";

type Props = {
  src: string;
  // clinicId?: string;
  // width?: string;
  // height?: string;
};
const YouTube: FC<Props> = ({ src }) => {
  return (
    <iframe
      width="560"
      height="315"
      src={src}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};
export default YouTube;
