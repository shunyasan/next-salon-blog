import { Box, Button, Image, Text } from "@chakra-ui/react";
import { FC, memo, VFC } from "react";
import { AboutCategory } from "types/api/AboutCategory";

type Props = {
  category: AboutCategory;
  gender: string;
  width: { md: string; sm: string };
  arrow: boolean;
  onClick: () => void;
  search?: () => void;
  // getId: (id: string) => void;
  // 1:女性 2:男性
};
export const CategoryBox: FC<Props> = (props) => {
  const { category, gender, width, arrow, onClick, search } = props;
  return (
    // <Box>
    <Box
      m={"1rem !important"}
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
      <Image
        alt={"部位"}
        src={gender === "男性" ? category.imgUrlMen : category.imgUrlLady}
      />
      <Text py={"0.7rem"} fontSize={{ md: "1em", sm: "0.8em" }}>
        {category.name}
      </Text>
      {arrow && search ? (
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
      )}
    </Box>
    // {arrow && <Box fontSize={"1.3rem"}>▼</Box>}
    // </Box>
  );
};
