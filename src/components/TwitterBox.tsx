import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { Twitter } from "@prisma/client";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { Gender } from "types/Gender";

type Props = {
  twitter: Twitter;
  width?: string;
  height?: string;
};
const TwitterBox: FC<Props> = ({ twitter, width, height }) => {
  const router = useRouter();
  const gender = (router.query.gender as Gender) || "lady";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script && document.body.appendChild(script);
    // アンマウント時に一応scriptタグを消しておく
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box>
      <Box mb=".5em" textAlign={"left"}>
        <Link
          ml="1em"
          color={"originGold"}
          fontSize={".7em"}
          href={`/${gender}/clinic/detail/${twitter.clinicId}`}
        >
          このクリニックを詳しくみる
        </Link>
      </Box>
      <Link
        className="twitter-timeline"
        data-height={height}
        data-width={width}
        href={`https://twitter.com/${twitter.code}?ref_src=twsrc%5Etfw`}
      >
        Tweets by {twitter.code}
      </Link>
    </Box>
  );
};
export default TwitterBox;
