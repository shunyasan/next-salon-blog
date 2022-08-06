import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import { Gender } from "@prisma/client";
import { FC, memo, useEffect, useState, VFC } from "react";
// import style from "../../../../styles/Home.module.css";

type Props = {
  staffGender: Gender;
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
      case "both":
        setGender({
          fir: { val: "女性", color: "#aa0000" },
          sec: { val: "男性", color: "#005dff" },
        });
        break;
      case "men":
        setGender({
          fir: { val: "男", color: "#005dff" },
          sec: { val: "性", color: "#005dff" },
        });
        break;
      case "lady":
        setGender({
          fir: { val: "女", color: "#aa0000" },
          sec: { val: "性", color: "#aa0000" },
        });
        break;
      default:
        setGender({
          fir: { val: "不", color: "originBlack" },
          sec: { val: "明", color: "originBlack" },
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
