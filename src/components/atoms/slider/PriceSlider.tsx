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
const price = defaultOrderPlanIdName.prices;

export const PriceSlider: FC<Props> = (props) => {
  const { onChange } = props;
  const [range, setRange] = useState<RangeUnit>(price);

  const onChangeRange = useCallback(
    (min: number, max: number) => {
      setRange({ min, max });
      onChange(min, max);
    },
    [onChange]
  );

  return (
    <Box>
      <HStack justifyContent={"center"}>
        <Text>
          <Text as="span" fontSize={{ md: "1.5em", sm: "1em" }}>
            {range.min}
          </Text>
          {range.min === 0 ? "円" : "万円"}
        </Text>
        <Text>〜</Text>
        <Text>
          <Text as="span" fontSize={{ md: "1.5em", sm: "1em" }}>
            {price.max === range.max ? "" : range.max}
          </Text>
          {price.max === range.max ? "上限なし" : "万円"}
        </Text>
      </HStack>
      <RangeSlider
        defaultValue={[price.min, price.max]}
        min={price.min}
        max={price.max}
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
