import { Icon } from "@chakra-ui/icons";
import { Box, Flex, Image, Select, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { defaultData } from "services/common/defaultData";
import { IdAndNameDto } from "types/IdAndNameDto";

type Props = {
  idName: IdAndNameDto;
  onChange: (idName: IdAndNameDto) => void;
};

const { defaultOption } = defaultData();

export const PlanOptionSelect: FC<Props> = ({ idName, onChange }) => {
  const onChangeValue = (value: string) => {
    switch (value) {
      case defaultOption.free.id:
        return onChange(defaultOption.free);
      case defaultOption.one.id:
        return onChange(defaultOption.one);
      case defaultOption.two.id:
        return onChange(defaultOption.two);
      case defaultOption.thr.id:
        return onChange(defaultOption.thr);
      case defaultOption.for.id:
        return onChange(defaultOption.for);
      default:
        return onChange(defaultOption.none);
    }
  };

  return (
    <Select
      _focus={{ outline: "originBlack" }}
      borderColor={"originBlack"}
      onChange={(e) => onChangeValue(e.target.value)}
      value={idName.id}
      fontSize=".9em"
    >
      {Object.entries(defaultOption).map(([key, value]) => (
        <option key={value.id} value={value.id}>
          {value.name}
        </option>
      ))}
    </Select>
  );
};
