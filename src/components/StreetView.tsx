import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { Gender } from "types/Gender";

type Props = {
  src: string;
  clinicId?: string;
};
const StreetView: FC<Props> = ({ src, clinicId }) => {
  const router = useRouter();
  const gender = (router.query.gender as Gender) || "lady";
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
            href={`/${gender}/clinic/detail/${clinicId}`}
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
