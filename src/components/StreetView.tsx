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
      <div
        dangerouslySetInnerHTML={{
          __html: `<iframe 
                    src="${src}"
                    width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                  </iframe>`,
        }}
      ></div>
    </>
  );
};
export default StreetView;
