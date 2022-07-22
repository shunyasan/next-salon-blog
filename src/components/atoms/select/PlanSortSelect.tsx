import { Icon } from "@chakra-ui/icons";
import { Box, Flex, Image, Select, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { defaultData } from "services/common/defaultData";
import { IdAndNameDto } from "types/IdAndNameDto";

type Props = {
  idName: IdAndNameDto;
  onChange: (idName: IdAndNameDto) => void;
};

const { defaultSort } = defaultData();

export const PlanSortSelect: FC<Props> = ({ idName, onChange }) => {
  const onChangeSort = (value: string) => {
    switch (value) {
      case defaultSort.price_asc.id:
        return onChange(defaultSort.price_asc);
      case defaultSort.price_desc.id:
        return onChange(defaultSort.price_desc);
      case defaultSort.oncePrice_asc.id:
        return onChange(defaultSort.oncePrice_asc);
      case defaultSort.oncePrice_desc.id:
        return onChange(defaultSort.oncePrice_desc);
      default:
        return onChange(defaultSort.none);
    }
  };

  return (
    <Select
      _focus={{ outline: "originBlack" }}
      borderColor={"originBlack"}
      onChange={(e) => onChangeSort(e.target.value)}
      value={idName.id}
    >
      {Object.entries(defaultSort).map(([key, value]) => (
        <option key={value.id} value={value.id}>
          {value.name}
        </option>
      ))}
    </Select>
  );
};
