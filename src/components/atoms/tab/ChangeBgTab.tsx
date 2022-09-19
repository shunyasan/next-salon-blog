import { Flex } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  selectTab: string;
  value: string;
  url?: string;
  onClick: () => void;
};
export const ChangeBgTab: FC<Props> = (props) => {
  const { selectTab, value, url, onClick } = props;

  return (
    <Flex
      as="a"
      fontSize={{ md: ".9em", sm: "0.8em" }}
      flexGrow={1}
      justifyContent="center"
      p={{ md: "1em", sm: ".5em 1em" }}
      transition={"0.5s"}
      cursor={"pointer"}
      href={url}
      onClick={onClick}
      fontWeight={selectTab !== value ? "light" : "bold"}
      color={selectTab !== value ? "#777" : "originGold"}
      bg={selectTab !== value ? "#bbb" : "originWhite"}
      _hover={{
        bg: selectTab !== value ? "#eee" : "",
        transition: "0.5s",
      }}
    >
      {value}
    </Flex>
  );
};
