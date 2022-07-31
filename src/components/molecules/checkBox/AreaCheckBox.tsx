import { FC } from "react";
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Gender } from "types/Gender";
import { defaultData } from "services/common/defaultData";
import { IdAndNameDto } from "types/IdAndNameDto";

const { defaultArea } = defaultData();

type Props = {
  // isOpen: boolean;
  // onClose: () => void;
  onChange: (idName: IdAndNameDto) => void;
};

export const AreaCheckBox: FC<Props> = (props) => {
  const { onChange } = props;

  const onChangeValue = (value: string) => {
    switch (value) {
      case defaultArea.shibuya.id:
        return onChange(defaultArea.shibuya);
      default:
        return onChange(defaultArea.shibuya);
    }
  };

  return (
    <CheckboxGroup colorScheme="blackAlpha" defaultValue={["AC000003"]}>
      <Stack spacing={[1, 5]}>
        {Object.entries(defaultArea).map(([key, value]) => (
          <Checkbox
            key={value.id}
            onChange={() => onChangeValue(value.id)}
            css={`
              span:first-of-type {
                box-shadow: unset;
              }
            `}
            value={value.id}
          >
            {value.name}
          </Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  );
};
