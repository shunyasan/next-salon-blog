import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ClinicOpeningHours } from "@prisma/client";
import { FC, useCallback } from "react";

type Props = {
  datas: ClinicOpeningHours[];
  size?: string;
};

export const OpeningHoursTable: FC<Props> = (props) => {
  const { datas, size } = props;

  const format = useCallback((date: Date) => {
    // toLocaleString({ timeZone: 'Asia/Tokyo' });
    const hour = date.getUTCHours();
    const min = ("0" + date.getUTCMinutes()).slice(-2);
    return `${hour}:${min}`;
  }, []);

  return (
    <Table variant={"unstyled"} size={size || "xs"}>
      <Thead>
        <Tr>
          <Th>診察時間</Th>
          <Th>月</Th>
          <Th>火</Th>
          <Th>水</Th>
          <Th>木</Th>
          <Th>金</Th>
          <Th>土</Th>
          <Th>日</Th>
          <Th>祝</Th>
        </Tr>
      </Thead>
      <Tbody fontSize={"1rem"}>
        {datas.map((hours, int) => (
          <Tr key={int}>
            <Td>
              {format(hours.startHours)}〜{format(hours.endHours)}
            </Td>
            <Td>{hours.mon ? "〇" : "ー"}</Td>
            <Td>{hours.thu ? "〇" : "ー"}</Td>
            <Td>{hours.wed ? "〇" : "ー"}</Td>
            <Td>{hours.thir ? "〇" : "ー"}</Td>
            <Td>{hours.fri ? "〇" : "ー"}</Td>
            <Td>{hours.sat ? "〇" : "ー"}</Td>
            <Td>{hours.sun ? "〇" : "ー"}</Td>
            <Td>{hours.hol ? "〇" : "ー"}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
