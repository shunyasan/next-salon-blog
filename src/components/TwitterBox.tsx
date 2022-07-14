import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";

type Props = {
  account: string;
  clinicId?: string;
  width?: string;
  height?: string;
  test?: string;
};
const TwitterBox: FC<Props> = ({ account, width, height, clinicId, test }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.body.appendChild(script);
    // アンマウント時に一応scriptタグを消しておく
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box>
      {clinicId && (
        <Box mb=".5em" textAlign={"left"}>
          <Link
            ml="1em"
            color={"originGold"}
            fontSize={".7em"}
            href={`clinic/detail/${clinicId}`}
          >
            詳しくみる
          </Link>
        </Box>
      )}
      <Link
        className="twitter-timeline"
        data-height={height}
        data-width={width}
        href={`https://twitter.com/${account}?ref_src=twsrc%5Etfw`}
      >
        Tweets by {account}
      </Link>
    </Box>
  );
};
export default TwitterBox;
