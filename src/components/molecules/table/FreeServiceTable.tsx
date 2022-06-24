import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ClinicOption } from "@prisma/client";
import { FC, memo, VFC } from "react";

type Props = {
  datas: ClinicOption;
};

export const FreeServiceTable: FC<Props> = (props) => {
  const { datas } = props;
  return (
    <Table variant={"unstyled"} size={"xs"}>
      <Thead>
        <Tr>
          <Th>初診料</Th>
          <Th>再診料</Th>
          <Th>照射漏れ</Th>
          <Th>アフターケア</Th>
          <Th>麻酔</Th>
          <Th>剃毛</Th>
          <Th>肌トラブル対応</Th>
        </Tr>
      </Thead>
      <Tbody fontSize={"1rem"}>
        <Tr>
          <Td>{datas.firstVisitFees || "-"}</Td>
          <Td>{datas.subsequentVisitFees || "-"}</Td>
          <Td>{datas.irradiationLeakage || "-"}</Td>
          <Td>{datas.aftercare || "-"}</Td>
          <Td>{datas.anesthesia || "-"}</Td>
          <Td>{datas.shaving || "-"}</Td>
          <Td>{datas.troubleTreatment || "-"}</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};
