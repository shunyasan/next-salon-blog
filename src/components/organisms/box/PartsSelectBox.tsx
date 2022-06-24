import { Box, Center, Flex, Select, Text } from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useCallback, VFC } from "react";
import { IdAndNameDto } from "types/IdAndNameDto";

type Props = {
  title: string;
  data: IdAndNameDto[];
  noneValue: string;
  onChange: (name: string, id: string) => void;
};
export const PartsSelectBox: FC<Props> = (props) => {
  const { title, data, noneValue, onChange } = props;

  const changeSetNewIdName = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newOrderId = e.target.value;
      const findData = data.find((val) => val.id === newOrderId);
      if (findData) {
        onChange(findData.name, findData.id);
      }
    },
    [data, onChange]
  );

  return (
    <Flex fontSize={"0.8rem"}>
      <Center w={{ md: "30%", sm: "38%" }} fontWeight={"bold"}>
        {title}
      </Center>
      <Flex w={{ md: "70%", sm: "62%" }} justifyContent={"center"}>
        <Select
          textAlign={"center"}
          border={"none"}
          w={"10rem"}
          size={"xs"}
          cursor={"pointer"}
          _hover={{ border: "1px", borderColor: "originGray" }}
          _focus={{ outline: "none", border: "1px", borderColor: "originGray" }}
          placeholder={data.length < 1 ? noneValue : ""}
          onChange={changeSetNewIdName}
        >
          {data.map((text) => (
            <option key={text.id} value={text.id}>
              {text.name}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  );
};
