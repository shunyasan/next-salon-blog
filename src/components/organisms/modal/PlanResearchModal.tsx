import { Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, memo, useCallback, useEffect, useState, VFC } from "react";
import { MdClose } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { getResearchCardData } from "services/app/etc/etc";
import { IdAndNameDto } from "types/IdAndNameDto";
import { OrderPlanIdName } from "types/app/OrderPlanIdName";
import { UnderLineItemBox } from "components/molecules/box/UnderLineItemBox";
import { ConditionPartsBox } from "components/molecules/box/ConditionPartsBox";
import { AboutCategory, BaseParts, OriginCategory } from "@prisma/client";
import { PlanSearchBox } from "../box/PlanSearchBox";

type Props = {
  orderPlan: OrderPlanIdName;
  isOpen: boolean;
  onClose: () => void;
  // resetPages: () => void;
  originCategories: OriginCategory[];
  aboutCategories: AboutCategory[];
  baseParts: BaseParts[];
};

export const PlanResearchModal: FC<Props> = (props) => {
  const {
    orderPlan,
    isOpen,
    onClose,
    // resetPages,
    originCategories,
    aboutCategories,
    baseParts,
  } = props;
  const router = useRouter();

  // const [orderData, setOrderData] = useState<OrderPlanIdName>(orderPlan);
  // const [partsAndCategory, setPartsAndCategory] = useState<{
  //   originCategory: IdAndNameDto[];
  //   aboutCategory: IdAndNameDto[];
  //   parts: IdAndNameDto[];
  // }>();

  // const getAllPartsAndCategory = useCallback(
  //   async (orderParams: OrderPlanIdName) => {
  //     const data = await getResearchCardData(
  //       orderParams.originParts.id,
  //       orderParams.aboutCategory.id,
  //       orderParams.parts?.id
  //     );
  //     setPartsAndCategory(data);
  //     setOrderData({
  //       ...orderParams,
  //       originParts: data.originCategory[0],
  //       aboutCategory: data.aboutCategory[0],
  //       parts: data.parts[0],
  //     });
  //     return data;
  //   },
  //   []
  // );

  // const getSetOrderData = async (key: string, name: string, id: string) => {
  //   if (orderData) {
  //     const checkedParts: OrderPlanIdName = checkNewAboutPartsData(
  //       orderData,
  //       key,
  //       name,
  //       id
  //     );

  //     await getAllPartsAndCategory(checkedParts);
  //   }
  // };

  // const researchPlan = async () => {
  //   if (orderData) {
  //     const param = createParameter(orderData);
  //      onClose();
  //     // resetPages();
  //     router.push({
  //       pathname: "/plan/search/1",
  //       search: `?${param}`,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   getAllPartsAndCategory(orderPlan);
  // }, [getAllPartsAndCategory, orderPlan]);

  return (
    // <Modal isOpen={isOpen} onClose={onClose}>
    //   <ModalOverlay />
    //   <ModalContent w={{ md: "inherit", sm: "90%" }}>
    //     <ModalCloseButton />
    //     <ModalBody p={{ md: "2rem", sm: "2rem 1rem" }}>
    <Box
      width="100%"
      height="100%"
      position="fixed"
      top="0"
      left="0"
      visibility={isOpen ? "visible" : "hidden"}
      zIndex="100"
      bg="rgba(30,30,30,0.5)"
    >
      {/* クリニック情報は重複するから入れない  
      部位の施術範囲とか常々情報が変わるものを入れる*/}
      <Box
        px={{ md: "3em", sm: "1em" }}
        bg="originWhite"
        w={{ md: "45em", sm: "90%" }}
        h="90%"
        mx="auto"
        my="2rem"
        overflow={"scroll"}
        textAlign={"right"}
      >
        <Icon
          top=".5em"
          pos="sticky"
          cursor={"pointer"}
          fontSize={"2em"}
          textAlign={"right"}
          as={MdClose}
          onClick={onClose}
          bg="originWhite"
        />
        <PlanSearchBox
          orderPlan={orderPlan}
          originCategories={originCategories}
          aboutCategories={aboutCategories}
          baseParts={baseParts}
          onClose={onClose}
        />
      </Box>
    </Box>
    //     </ModalBody>
    //   </ModalContent>
    // </Modal>
  );
};
