import { FC, VFC } from "react";
import { IconButton, Box, Flex, Stack } from "@chakra-ui/react";

type Props = {
  width: string;
  onClick?: () => void;
  // paddingY?: string;
};

export const HamburgerIcon: FC<Props> = (props) => {
  const { width, onClick } = props;
  return (
    <Stack
      justifyContent={"center"}
      // onClick={onClick}
      spacing={"7px"}
      p={"3vw 4vw"}
      w={width}
      cursor={"pointer"}
      onClick={onClick}
    >
      <Box borderBottom={"1px"} borderColor={"white"}></Box>
      <Box borderBottom={"1px"} borderColor={"white"}></Box>
      <Box borderBottom={"1px"} borderColor={"white"}></Box>
    </Stack>

    ///////
    // <IconButton
    //   w={width}
    //   h={paddingY}
    //   verticalAlign={"center"}
    //   color={"originWhite"}
    //   fontSize="1.5rem"
    //   aria-label="メニューボタン"
    //   icon={<HamburgerIcon />}
    //   variant="unstyled"
    //   onClick={onClick}
    // />
  );
};
