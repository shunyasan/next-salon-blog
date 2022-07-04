import { FC, VFC } from "react";
import { IconButton, Box, Flex, Stack } from "@chakra-ui/react";

type Props = {
  // width: string;
  // paddingY?: string;
  // onClick?: () => void;
};

export const HamburgerIcon: FC<Props> = (props) => {
  // const {  width, paddingY } = props;
  return (
    <Stack
      justifyContent={"center"}
      // onClick={onClick}
      spacing={"7px"}
      p={"1em 1.5em"}
      w={"5rem"}
      mx={"auto"}
      cursor={"pointer"}
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
