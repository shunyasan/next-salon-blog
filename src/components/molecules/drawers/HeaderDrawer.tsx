import { FC } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Stack,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClick: (path: string) => void;
};

export const HeaderDrawer: FC<Props> = (props) => {
  const { isOpen, onClose, onClick } = props;

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody as="nav" p={0}>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              h={"100%"}
              bg={"originBlack"}
              color={"originWhite"}
            >
              <Stack
                spacing={"2rem"}
                // w={"100%"}
              >
                <Box
                  textAlign="center"
                  px={"1.3rem"}
                  py={"0.1rem"}
                  cursor="pointer"
                  onClick={() => onClick("/")}
                  _hover={{
                    transition: "0.5s",
                    backgroundColor: "rgba(220,220,220,0.2)",
                  }}
                >
                  TOP
                </Box>
                <Box
                  textAlign="center"
                  px={"1.3rem"}
                  py={"0.1rem"}
                  mx={2}
                  cursor="pointer"
                  onClick={() => onClick("/plan")}
                  _hover={{
                    transition: "0.5s",
                    backgroundColor: "rgba(220,220,220,0.2)",
                  }}
                >
                  プランを探す
                </Box>
                <Box
                  textAlign="center"
                  px={"1.3rem"}
                  py={"0.1rem"}
                  mx={2}
                  cursor="pointer"
                  onClick={() => onClick("/treatment-parts")}
                  _hover={{
                    transition: "0.5s",
                    backgroundColor: "rgba(220,220,220,0.2)",
                  }}
                >
                  部位一覧
                </Box>
                <Box
                  textAlign="center"
                  px={"1.3rem"}
                  py={"0.1rem"}
                  mx={2}
                  cursor="pointer"
                  _hover={{
                    transition: "0.5s",
                    backgroundColor: "rgba(220,220,220,0.2)",
                  }}
                  onClick={() => onClick("/clinic")}
                >
                  クリニック一覧
                </Box>
              </Stack>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
