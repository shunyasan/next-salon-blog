import { FC, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IdAndNameDto } from "types/IdAndNameDto";
import Image from "next/image";

type Props = {
  image: string;
  alt: string;
  data: IdAndNameDto;
  onClick: (machineId: string) => void;
  width: string | { md: string; sm: string };
  height: string | { md: string; sm: string };
};

export const MachineCheckBox: FC<Props> = (props) => {
  const { onClick, image, data, alt, width, height } = props;

  const [selected, setSelected] = useState<boolean>(false);

  const onClickMachine = (machineId: string) => {
    onClick(machineId);
    setSelected(!selected);
  };

  return (
    <Box
      w={width}
      shadow={"lg"}
      m={".5em"}
      filter={selected ? "brightness(100%)" : "brightness(30%)"}
      bg={selected ? "originWhite" : "#fff"}
      onClick={() => onClickMachine(data.id)}
    >
      <Box
        mx={"auto"}
        width={{ md: "100%", sm: "100%" }}
        height={height}
        pos="relative"
      >
        <Image layout="fill" objectFit={"contain"} src={image} alt={alt} />
      </Box>
      <Text py=".5em">{data.name}</Text>
    </Box>
  );
};
