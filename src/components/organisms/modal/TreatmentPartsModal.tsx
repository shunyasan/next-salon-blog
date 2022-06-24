import { Box, Stack, Text } from "@chakra-ui/react";
import { UnderLineText } from "components/atoms/text/UnderLineText";
import { useRouter } from "next/router";
import { FC } from "react";
import PartsHead from "../../article/base/parts/PartsHead";

type Props = {
  partsId: string;
  isOpen: boolean;
  onClose: () => void;
};

export const TreatmentPartsModal: FC<Props> = (props) => {
  const { partsId, isOpen, onClose } = props;
  const router = useRouter();

  return (
    <Box
      my={"2rem"}
      // width="100%"
      // height="100%"
      // position="fixed"
      // top="0"
      // left="0"
      // visibility={isOpen ? "visible" : "hidden"}
      // onClick={onClose}
      // zIndex="100"
      // bg="rgba(30,30,30,0.5)"
    >
      <PartsHead />
    </Box>
  );
};
