import { Text } from "@chakra-ui/react";
import { FC, memo, useEffect, useState, VFC } from "react";

type Props = {
  text: string | number;
  first: string;
  second: string;
  fontSize?: { md: string; sm: string };
  other: string;
};
export const StatusText: FC<Props> = (props) => {
  const { text, first, second, fontSize, other } = props;
  const [statusColor, setStatusColor] = useState<string>();

  useEffect(() => {
    switch (text) {
      case first:
        setStatusColor("SeeThroughGold");
        break;
      case second:
        setStatusColor("SeeThroughBlue");
        break;
      default:
        setStatusColor("");
        break;
    }
    // const func: any = {};
    // func[first] = "SeeThroughGold";
    // func[second] = "SeeThroughBlue";
    // const bg = func[text];
    // if (bg) {
    //   setStatusColor(bg);
    // } else {
    //   setStatusColor("");
    // }
  }, [first, second, text]);

  return (
    <Text as={"a"} bg={statusColor} px={"5px"} fontSize={fontSize}>
      {text || other}
    </Text>
  );
};
