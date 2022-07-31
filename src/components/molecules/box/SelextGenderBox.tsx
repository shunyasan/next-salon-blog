import { Icon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FC, useCallback, useEffect, useState } from "react";
import { TbMan, TbSwitchVertical, TbWoman } from "react-icons/tb";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { Gender } from "types/Gender";

export const SelextGenderBox: FC = () => {
  const [gender, setGender] = useState<{ name: Gender; icon: IconType }>();
  const router = useRouter();

  const changeGenderState = () => {
    const newGender = gender?.name === "men" ? "lady" : "men";
    router.query.gender = newGender;
    router.push({
      pathname: router.pathname,
      query: { ...router.query },
    });
  };

  useEffect(() => {
    switch (router.query.gender) {
      case "men":
        setGender({ name: "men", icon: TbMan });
        break;
      default:
        setGender({ name: "lady", icon: TbWoman });
        break;
    }
  }, [router]);

  return (
    <Box
      border={"1px"}
      borderRadius={"sm"}
      borderColor={"originWhite"}
      w="3.5em"
      py={".2em "}
      onClick={() => changeGenderState()}
    >
      <Icon fontSize={"2.2em"} as={gender?.icon} />
      <Flex justifyContent={"center"}>
        <Text fontSize={".7em"}>{gender?.name}</Text>
        <Icon mt="3px" ml="2px" fontSize={".8em"} as={TbSwitchVertical} />
      </Flex>
    </Box>
  );
};
