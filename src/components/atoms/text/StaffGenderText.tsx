import { Box, Center, Text } from "@chakra-ui/layout";
import { FC, memo, useEffect, useState, VFC } from "react";
// import style from "../../../../styles/Home.module.css";

type Props = {
  staffGender: number;
};

export const StaffGenderText: FC<Props> = (props) => {
  const { staffGender } = props;
  const [gender, setGender] = useState<{ gender: string; color: string }>({
    gender: "-",
    color: "",
  });

  useEffect(() => {
    if (staffGender === 1 || staffGender === 3) {
      setGender({ gender: "女性", color: "#aa0000" });
    } else if (staffGender === 2 || staffGender === 3) {
      setGender({ gender: "男性", color: "#005dff" });
    }
  }, [staffGender]);

  return (
    <Box fontSize={"0.85em"}>
      <Text fontWeight={"bold"} color={gender.color} display={"inline"}>
        {gender.gender}
      </Text>

      {/* <Text fontWeight={"bold"} color="#aa0000" display={"inline"}>
        {staffGender === 1 || staffGender === 3 ? "女性" : ""}
      </Text>
      {staffGender === 2 || staffGender === 3 ? (
        <Text fontWeight={"bold"} color="#" display={"inline"}>
          男性
        </Text>
      ) : (
        ""
      )} 
      <Text ml={"5px"} display={"inline"} fontSize={"0.8rem"}>
        が施術
      </Text> */}
    </Box>
  );
};
