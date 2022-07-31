import { Box, Button, Text } from "@chakra-ui/react";
import { AboutCategory } from "@prisma/client";
import Image from "next/image";
import { FC, memo, VFC } from "react";
import { Gender } from "types/Gender";

type Props = {
  category: AboutCategory;
  gender: Gender;
  width: { md: string; sm: string };
  arrow: boolean;
  onClick: () => void;
  search?: () => void;
  // getId: (id: string) => void;
};
export const CategoryBox: FC<Props> = (props) => {
  const { category, gender, width, arrow, onClick, search } = props;
  return (
    // <Box>
    <Box
      m={"1rem"}
      pb={"0.5em"}
      w={width}
      h={search ? { md: "12em", sm: "10em" } : ""}
      cursor={"pointer"}
      onClick={onClick}
      // border={arrow ? "4px" : ""}
      // border={arrow ? "4px" : ""}
      transition={"0.2s"}
      transitionTimingFunction={"linear"}
      shadow={arrow ? "0 0 3px 2px #888" : ""}
    >
      <Box>
        <Image
          width={"100%"}
          height="70%"
          layout="responsive"
          objectFit="contain"
          alt={"部位"}
          src={gender === "men" ? category.imgUrlMen : category.imgUrlLady}
        />
      </Box>
      <Text py={"0.7rem"} fontSize={{ md: "1em", sm: "0.8em" }}>
        {category.name}
      </Text>
      {/* {arrow && search ? (
        <Box>
          <Button
            variant={"whiteNotSpace"}
            p={"3px"}
            fontSize={"0.5em"}
            onClick={search}
          >
            このプランを探す
          </Button>
        </Box>
      ) : (
        ""
      )} */}
    </Box>
    // {arrow && <Box fontSize={"1.3rem"}>▼</Box>}
    // </Box>
  );
};
