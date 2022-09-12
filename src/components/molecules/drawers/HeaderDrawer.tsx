import { FC } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Link,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Gender } from "types/Gender";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const HeaderDrawer: FC<Props> = (props) => {
  const { isOpen, onClose } = props;
  const router = useRouter();
  const gender = (router.query.gender as Gender) || "lady";

  const datas = [
    {
      path: "",
      text: "TOP",
    },
    {
      path: "plan",
      text: "プランを探す",
    },
    {
      path: "treatment-parts",
      text: "部位一覧",
    },
    {
      path: "clinic/1",
      text: "クリニック一覧",
    },
  ];
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
                textAlign="center"
                // w={"100%"}
              >
                {datas.map((data, i) => (
                  <Link
                    key={i}
                    px={"1.3rem"}
                    py={"0.1rem"}
                    cursor="pointer"
                    href={`/${gender}/${data.path}`}
                    _hover={{
                      transition: "0.5s",
                      backgroundColor: "rgba(220,220,220,0.2)",
                    }}
                  >
                    {data.text}
                  </Link>
                ))}
              </Stack>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
