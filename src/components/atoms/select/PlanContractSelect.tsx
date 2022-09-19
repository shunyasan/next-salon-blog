import { Icon } from "@chakra-ui/icons";
import { Box, Flex, Image, Select, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { defaultData } from "services/common/defaultData";
import { IdAndNameDto } from "types/IdAndNameDto";

type Props = {
  idName: IdAndNameDto;
  onChange: (idName: IdAndNameDto) => void;
};

// 消す予定
export const PlanContractSelect: FC<Props> = ({ idName, onChange }) => {
  const datas = [
    { id: "OK", name: "可能" },
    { id: "none", name: "指定なし" },
  ];
  const onChangeValue = (value: string) => {
    switch (value) {
      case datas[0].id:
        return onChange(datas[0]);
      default:
        return onChange(datas[1]);
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
      {datas.map((value) => (
        <option key={value.id} value={value.id}>
          {value.name}
        </option>
      ))}
    </Select>
  );
};
