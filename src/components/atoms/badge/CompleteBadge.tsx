import { Box, Center, Text } from "@chakra-ui/layout";
import { FC, memo, useEffect, useState, VFC } from "react";
import style from "../../../../styles/Home.module.css";

type Props = {
  number: number;
  selected: boolean;
  mx: string;
  circle: { md: string; sm: string };
};

export const CompleteBadge: FC<Props> = (props) => {
  const { number, selected, mx, circle } = props;
  const [anime, setAnime] = useState<string>();

  useEffect(() => {
    if (selected) {
      setAnime(style.showBadge);
    } else if (!selected) {
      setAnime("");
    }
  }, [selected]);
  return (
    <Center
      className={anime}
      w={{ md: circle.md, sm: circle.sm }}
      h={{ md: circle.md, sm: circle.sm }}
      mx={mx}
      backgroundColor={selected ? "" : "inherit"}
      borderRadius="50%"
    >
      <Text
        className="showNumber"
        color={selected ? "" : "originBlack"}
        fontSize={{ md: "1em", sm: "0.8em" }}
      >
        {number}
      </Text>
    </Center>
  );
};
