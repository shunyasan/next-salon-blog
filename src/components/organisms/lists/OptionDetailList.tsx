import { Option, OptionKind } from "@prisma/client";
import { OptionDetailBox } from "components/molecules/box/OptionDetailBox";
import { FC } from "react";
type Props = {
  options: Option[];
  fontSize?: string;
  my?: { md: string; sm: string };
};

// FreeServiceBoxListと似ているのでどちらか削除

export const OptionDetailList: FC<Props> = (props) => {
  const { options, fontSize, my } = props;

  return (
    <>
      <OptionDetailBox
        options={options}
        title={"初診料"}
        kind={OptionKind.firstVisitFees}
        my={my}
        fontSize={fontSize}
      />
      <OptionDetailBox
        options={options}
        title={"再診料"}
        kind={OptionKind.revisitFees}
        my={my}
        fontSize={fontSize}
      />
      <OptionDetailBox
        options={options}
        title={"照射漏れ"}
        kind={OptionKind.leakage}
        my={my}
        fontSize={fontSize}
      />
      <OptionDetailBox
        options={options}
        title={"アフターケア"}
        kind={OptionKind.aftercare}
        my={my}
        fontSize={fontSize}
      />
      <OptionDetailBox
        options={options}
        title={"麻酔"}
        kind={OptionKind.anesthesia}
        my={my}
        fontSize={fontSize}
      />
      <OptionDetailBox
        options={options}
        title={"剃毛"}
        kind={OptionKind.shaving}
        my={my}
        fontSize={fontSize}
      />
      <OptionDetailBox
        options={options}
        title={"トラブル対応"}
        kind={OptionKind.skinTrouble}
        my={my}
        fontSize={fontSize}
      />
      <OptionDetailBox
        options={options}
        title={"途中解約"}
        kind={OptionKind.contract}
        my={my}
        fontSize={fontSize}
      />
    </>
  );
};
