import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";

type Props = {
  src: string;
  clinicId?: string;
};
const StreetView: FC<Props> = ({ src, clinicId }) => {
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://www.instagram.com/embed.js";
  //   document.body.appendChild(script);
  //   // アンマウント時に一応scriptタグを消しておく
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <>
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
      <iframe
        title="street_view"
        src={src}
        width="600"
        height="450"
        style={{ border: "0" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
};
export default StreetView;
