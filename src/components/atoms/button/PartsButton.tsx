import { Button } from "@chakra-ui/button";
import { FC, memo, VFC } from "react";

type Props = {
  text: string;
  onClick: () => void;
  filter: boolean;
};

export const PartsButton: FC<Props> = (props) => {
  const { text, onClick, filter } = props;
  return (
    <Button
      variant={"parts"}
      m={{ md: "1em", sm: "0.5em" }}
      fontSize={{ md: "1em", sm: "0.8em" }}
      onClick={onClick}
      filter={filter ? "brightness(90%)" : "brightness(100%)"}
    >
      {text}
    </Button>
  );
};
