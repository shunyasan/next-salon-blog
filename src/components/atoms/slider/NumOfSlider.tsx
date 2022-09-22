import {
  Box,
  Flex,
  HStack,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react";
import { FC, useCallback, useState } from "react";
import { defaultData } from "services/common/defaultData";
import { IdAndNameDto } from "types/IdAndNameDto";
import { RangeUnit } from "types/RangeUnit";

type Props = {
  onChange: (min: number, max: number) => void;
};

const { defaultOrderPlanIdName } = defaultData();
const numof = defaultOrderPlanIdName.times;

export const NumOfSlider: FC<Props> = (props) => {
  const { onChange } = props;
  const [range, setRange] = useState<RangeUnit>(numof);

  const onChangeRange = useCallback(
    (min: number, max: number) => {
      setRange({ min, max });
      onChange(min, max);
    },
    [onChange]
  );

  const whenMaxString = (num: number) => {
    if (num === 0) {
      return "無制限";
    } else if (numof.max <= num) {
      return `回以上`;
    } else {
      return `回`;
    }
  };

  return (
    <Box>
      <HStack justifyContent={"center"}>
        <Text>
          <Text as="span" fontSize={{ md: "1.5em", sm: "1em" }}>
            {range.min === 0 ? "" : range.min}
          </Text>
          {range.min === 0 ? "無制限" : "回"}
        </Text>
        <Text>〜</Text>
        <Text>
          <Text as="span" fontSize={{ md: "1.5em", sm: "1em" }}>
            {range.max === 0 ? "" : range.max}
          </Text>
          {whenMaxString(range.max)}
        </Text>
      </HStack>
      <RangeSlider
        defaultValue={[numof.min, numof.max]}
        min={numof.min}
        max={numof.max}
        step={1}
        onChangeEnd={(val) => onChangeRange(val[0], val[1])}
      >
        <RangeSliderTrack bg="white" shadow={"md"}>
          <RangeSliderFilledTrack bg="black" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={3} index={0}>
          <Box color={"black"} border={"2px"} borderRadius={"50%"} />
        </RangeSliderThumb>
        <RangeSliderThumb boxSize={3} index={1}>
          <Box color={"black"} border={"2px"} borderRadius={"50%"} />
        </RangeSliderThumb>
      </RangeSlider>
    </Box>
  );
};
