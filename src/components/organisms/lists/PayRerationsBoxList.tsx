import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { FC, memo, useCallback, VFC } from "react";
import { OptionText } from "types/app/OptionText";
import { FreeServiceBox } from "../box/FreeServiceBox";
type Props = {
  payments: OptionText[];
};

export const PayRerationsBoxList: FC<Props> = (props) => {
  const { payments } = props;
  return (
    <HStack spacing={"0"} wrap={"wrap"} justifyContent={"center"}>
      {payments.map((data, i) => (
        <FreeServiceBox
          title={data.name}
          value={data.text}
          fontSize={{ true: "0.75em", false: "0.6em" }}
          height={"6em"}
          width={"7.5em"}
          changeVal={"OK"}
          key={i}
        />
      ))}
    </HStack>
  );
};
