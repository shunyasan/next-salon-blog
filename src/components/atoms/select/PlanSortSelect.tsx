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
  // const datas = [
  //   { id: "none", name: "こだわらない" },
  //   { id: "price_asc", name: "安い順（総額）" },
  //   { id: "price_desc", name: "高い順（総額）" },
  //   { id: "oncePrice_asc", name: "安い順（１回分）" },
  //   { id: "oncePrice_desc", name: "高い順（１回分）" },
  // ];

  const datas = defaultSort;
  const onChangeSort = (value: string) => {
    switch (value) {
      case datas.price_asc.id:
        return onChange(datas.price_asc);
      case datas.price_desc.id:
        return onChange(datas.price_desc);
      case datas.oncePrice_asc.id:
        return onChange(datas.oncePrice_asc);
      case datas.oncePrice_desc.id:
        return onChange(datas.oncePrice_desc);
      default:
        return onChange(datas.none);
    }
  };

  return (
    <Select
      _focus={{ outline: "originBlack" }}
      borderColor={"originBlack"}
      onChange={(e) => onChangeSort(e.target.value)}
      value={idName.id}
    >
      {Object.entries(datas).map(([key, value]) => (
        <option key={value.id} value={value.id}>
          {value.name}
        </option>
      ))}
    </Select>
  );
};
