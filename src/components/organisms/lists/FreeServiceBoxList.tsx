import { Box, HStack } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import { ClinicOptionTitleValue } from "services/app/clinic/ClinicDetailHooks";
import { ClinicOption } from "types/api/ClinicOption";
import { TitleValue } from "types/app/TitleValue";
import { FreeServiceBox } from "../box/FreeServiceBox";
type Props = {
  clinicOption: ClinicOption;
};

export const FreeServiceBoxList: FC<Props> = (props) => {
  const { clinicOption } = props;

  const [optionData, setOptionData] = useState<TitleValue[]>();

  const getOption = useCallback(() => {
    const data = ClinicOptionTitleValue(clinicOption);
    setOptionData(data);
  }, [clinicOption]);

  useEffect(() => {
    getOption();
  }, [getOption]);

  // const checkNoneValue = useCallback((val: string) => {
  //   if (!val || val === "なし") {
  //     return "-";
  //   }
  //   return val;
  // }, []);

  // useEffect(() => {
  //   const datas = [
  //     { title: "初診料", value: checkNoneValue(clinicOption.firstVisitFees) },
  //     {
  //       title: "再診料",
  //       value: checkNoneValue(clinicOption.subsequentVisitFees),
  //     },
  //     {
  //       title: "照射漏れ",
  //       value: checkNoneValue(clinicOption.irradiationLeakage),
  //     },
  //     { title: "アフターケア", value: checkNoneValue(clinicOption.aftercare) },
  //     { title: "麻酔", value: checkNoneValue(clinicOption.anesthesia) },
  //     { title: "剃毛", value: checkNoneValue(clinicOption.shaving) },
  //     {
  //       title: "肌トラブル対応",
  //       value: checkNoneValue(clinicOption.troubleTreatment),
  //     },
  //   ];
  //   setOptionData(datas);
  // }, [checkNoneValue, clinicOption]);

  return (
    <HStack spacing={"0"} justifyContent={"center"}>
      {optionData &&
        optionData.map((data, i) => (
          <FreeServiceBox
            title={data.title}
            value={data.value}
            fontSize={{ true: "0.75em", false: "0.6em" }}
            height={"6em"}
            width={"8em"}
            changeVal={"無料"}
            key={i}
          />
        ))}
    </HStack>
  );
};
