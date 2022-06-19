import { Flex, HStack } from "@chakra-ui/react";
import { AboutCategory } from "@prisma/client";
import { FC, memo, VFC } from "react";
import { CategoryBox } from "../box/CategoryBox";
type Props = {
  about: AboutCategory[];
  gender: string;
  selectedId: string;
  onClick: (id: string) => void;
  search?: (originId: string, id: string) => void;
};

export const AboutTreatmentParts: FC<Props> = (props) => {
  const { about, gender, selectedId, onClick, search } = props;
  return (
    <Flex
      // w={"80%"}
      // mx="auto"
      wrap={"wrap"}
      justifyContent={"space-evenly"}
    >
      {about.map((data, i) => (
        <CategoryBox
          key={i}
          category={data}
          gender={gender}
          width={{ md: "10rem", sm: "7.5rem" }}
          arrow={selectedId === data.id}
          onClick={() => onClick(data.id)}
          search={search && (() => search(data.originId, data.id))}
        />
      ))}
    </Flex>
  );
};
