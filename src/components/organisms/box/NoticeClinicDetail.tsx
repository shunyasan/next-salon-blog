import { Box, Flex } from "@chakra-ui/react";
import { Clinic } from "@prisma/client";
import { PlanConditionBox } from "components/molecules/box/PlanConditionBox";
import { TbNurse } from "react-icons/tb";
import {
  MdOutlineBookmarkAdded,
  MdOutlineDoorBack,
  MdOutlineKingBed,
} from "react-icons/md";
import { FC } from "react";

type Props = {
  clinic: Clinic;
  width: string;
  py: string;
  fontSize?: { md: string; sm: string };
  border?: string;
  fontWeigth?: boolean;
};

export const NoticeClinicDetail: FC<Props> = (props) => {
  const { clinic, width, py, fontSize, border, fontWeigth } = props;
  return (
    <Flex wrap={"wrap"} justifyContent={"space-around"}>
      {[
        <PlanConditionBox
          key={clinic.name}
          title={"施術者"}
          icon={TbNurse}
          text={clinic.staffGender}
          gender={clinic.staffGender}
          fontSize={fontSize}
          fontWeight={fontWeigth === undefined ? true : fontWeigth}
        />,
        <PlanConditionBox
          key={clinic.name}
          title={"予約システム"}
          icon={MdOutlineBookmarkAdded}
          text={clinic.reserve ? "あり" : "ー"}
          first={"あり"}
          // second={""}
          // other={"ー"}
          fontSize={fontSize}
          fontWeight={fontWeigth === undefined ? true : fontWeigth}
        />,
        <PlanConditionBox
          key={clinic.name}
          title={"内装"}
          icon={MdOutlineKingBed}
          text={clinic.interior || "ー"}
          first={"豪華"}
          second={"綺麗"}
          other={"ー"}
          fontSize={fontSize}
          fontWeight={fontWeigth === undefined ? true : fontWeigth}
        />,
        <PlanConditionBox
          key={clinic.name}
          title={"施術室"}
          icon={MdOutlineDoorBack}
          text={clinic.roomType || "ー"}
          first={"完全個室"}
          second={"個室"}
          other={"ー"}
          fontSize={fontSize}
          fontWeight={fontWeigth === undefined ? true : fontWeigth}
        />,
      ].map((data, i) => (
        <Box
          key={i}
          w={width}
          py={py}
          borderTop={border || "1px"}
          borderColor={"originGray"}
        >
          {data}
        </Box>
      ))}
      <Box
        w={width}
        borderTop={border || "1px"}
        borderColor={"originGray"}
      ></Box>
      <Box
        w={width}
        borderTop={border || "1px"}
        borderColor={"originGray"}
      ></Box>
    </Flex>
  );
};
