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
};

export const MachineCheckBox: FC<Props> = (props) => {
  const { onClick, image, data, alt } = props;

  const [selected, setSelected] = useState<boolean>(false);

  const onClickMachine = (machineId: string) => {
    onClick(machineId);
    setSelected(!selected);
  };

  return (
    <Box
      shadow={"lg"}
      m={".5em"}
      filter={selected ? "brightness(100%)" : "brightness(30%)"}
      bg={selected ? "originWhite" : "#fff"}
      onClick={() => onClickMachine(data.id)}
    >
      <Box
        mx={"auto"}
        width={{ md: "13em", sm: "100%" }}
        height={{ md: "10em", sm: "70vw" }}
        pos="relative"
      >
        <Image layout="fill" objectFit={"contain"} src={image} alt={alt} />
      </Box>
      <Text py=".5em">{data.name}</Text>
    </Box>
  );
};
