import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { ClinicOpeningHours, ClinicOption } from "@prisma/client";
import { FC, memo, useCallback, VFC } from "react";
import { Clinic } from "types/api/Clinic";
import { PriceDto } from "types/api/dto/PriceDto";
import { InlineTitleBadge } from "../../atoms/badge/InlineTitleBadge";
import { PlanDetailModal } from "../../organisms/modal/PlanDetailModal";

type Props = {
  price: PriceDto;
  onClick?: () => void;
  clinic?: Clinic & {
    clinicOption: ClinicOption | null;
    clinicOpeningHours: ClinicOpeningHours[];
  };
  isOpen?: boolean;
  onClose?: () => void;
};
export const SmallPlanCard: FC<Props> = (props) => {
  const { price, onClick, clinic, isOpen, onClose } = props;
  const checkGender = useCallback(() => {
    const func: any = {};
    func[1] = "女性";
    func[2] = "男性";
    func[3] = "男性・女性";
    const gender = func[price.gender] as string;
    return gender;
  }, [price]);
  return (
    <>
      <HStack
        p={"0.5em"}
        borderRadius={8}
        border={"1px"}
        borderColor={"originGray"}
        justifyContent={"space-around"}
        fontSize={"0.8rem"}
        spacing={"0"}
        cursor={onClick ? "pointer" : ""}
        _hover={{
          transition: ".5s",
          bg: onClick ? "#ccc" : "",
        }}
        onClick={onClick}
      >
        <HStack spacing={"0"} justifyContent={"center"} w={"53%"}>
          <Text>{price.name}</Text>
          <Text w={"40%"}>({checkGender()})</Text>
        </HStack>
        <Text w={"2.5em"}>{price.times}回</Text>
        <HStack>
          <Box textAlign={"center"} display={"inline-block"}>
            <InlineTitleBadge>総額</InlineTitleBadge>
            <Text fontSize={{ md: "1.5em", sm: "1.3em" }}>
              ¥{price.price.toLocaleString()}
              {/* <Text as={"a"} fontSize={"0.6rem"}>
              ({price.})
            </Text> */}
            </Text>
          </Box>
          {/* <Button variant={"base"} ml={"1rem"} size={"xs"}>
          詳細
        </Button> */}
        </HStack>
      </HStack>
      {isOpen && onClose && clinic ? (
        <PlanDetailModal
          isOpen={isOpen}
          onClose={onClose}
          price={price}
          clinic={clinic}
        />
      ) : (
        ""
      )}
    </>
  );
};
