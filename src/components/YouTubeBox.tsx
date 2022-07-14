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
    <div
      dangerouslySetInnerHTML={{
        __html: `<iframe
          width="560"
          height="315"
          src="${src}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>`,
      }}
    ></div>
  );
};
export default YouTube;
