import { Icon } from "@chakra-ui/icons";
import { Box, Flex, Image, Select, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { IdAndNameDto } from "types/IdAndNameDto";

type Props = {
  idName: IdAndNameDto;
  onChange: (idName: IdAndNameDto) => void;
};

export const PlanSortSelect: FC<Props> = ({ idName, onChange }) => {
  const datas = [
    { id: "none", name: "こだわらない" },
    { id: "price_asc", name: "安い順（総額）" },
    { id: "price_desc", name: "高い順（総額）" },
    { id: "oncePrice_asc", name: "安い順（１回分）" },
    { id: "oncePrice_desc", name: "高い順（１回分）" },
  ];

  const onChangeSort = (value: string) => {
    switch (value) {
      case datas[1].id:
        return onChange(datas[1]);
      case datas[2].id:
        return onChange(datas[2]);
      case datas[3].id:
        return onChange(datas[3]);
      case datas[4].id:
        return onChange(datas[4]);
      default:
        return onChange(datas[0]);
    }
  };

  return (
    <Select
      _focus={{ outline: "originBlack" }}
      borderColor={"originBlack"}
      onChange={(e) => onChangeSort(e.target.value)}
    >
      {datas.map((data) => (
        <option key={data.id} value={data.id} selected={idName.id === data.id}>
          {data.name}
        </option>
      ))}
    </Select>
  );
};
