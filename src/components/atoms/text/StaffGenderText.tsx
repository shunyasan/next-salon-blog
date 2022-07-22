import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import { FC, memo, useEffect, useState, VFC } from "react";
// import style from "../../../../styles/Home.module.css";

type Props = {
  staffGender: number;
};

export const StaffGenderText: FC<Props> = (props) => {
  const { staffGender } = props;
  const [gender, setGender] = useState<{
    fir: { val: string; color: string };
    sec: { val: string; color: string };
  }>({
    fir: { val: "女", color: "#aa0000" },
    sec: { val: "性", color: "#aa0000" },
  });

  useEffect(() => {
    switch (staffGender) {
      case 3:
        setGender({
          fir: { val: "女性", color: "#aa0000" },
          sec: { val: "男性", color: "#005dff" },
        });
        break;
      case 2:
        setGender({
          fir: { val: "男", color: "#005dff" },
          sec: { val: "性", color: "#005dff" },
        });
        break;
      default:
        setGender({
          fir: { val: "女", color: "#aa0000" },
          sec: { val: "性", color: "#aa0000" },
        });
        break;
    }
  }, [staffGender]);

  return (
    <Box fontSize={"0.8em"}>
      <Flex fontWeight={"bold"}>
        <Text display={"inline"} color={gender.fir.color}>
          {gender.fir.val}
        </Text>
        <Text display={"inline"} color={gender.sec.color}>
          {gender.sec.val}
        </Text>
      </Flex>
    </Box>
  );
};
