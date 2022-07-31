import { FC, useState } from "react";
import {
  Box,
  ButtonGroup,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PriceDto } from "types/PriceDto";
import { ResetButton, SubmitButton, TextareaControl } from "formik-chakra-ui";
import { Formik } from "formik";

type Props = {
  price: PriceDto;
  isOpen: boolean;
  onClose: () => void;
};

type Contact = {
  text: string;
};

const initialValues: Contact = {
  text: "",
};

export const PriceReportModal: FC<Props> = ({ price, isOpen, onClose }) => {
  const [complete, setComplete] = useState<boolean>(false);

  const onSubmit = async (value: Contact) => {
    // values.preventDefault()
    try {
      const res = await fetch("/api/price-report", {
        body: JSON.stringify({
          text: value.text,
          clinic: price.clinic.name,
          plan: price.name,
          price: price.price,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      setComplete(true);
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx="1em">
          <ModalCloseButton />
          <ModalBody>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ handleSubmit, values, errors }) => (
                <Stack
                  fontWeight={"bold"}
                  spacing="1em"
                  m="3rem auto"
                  as="form"
                  borderWidth="1px"
                  rounded="sm"
                  shadow="1px 1px 3px rgba(0,0,0,0.3)"
                  maxWidth={800}
                  p={6}
                  onSubmit={handleSubmit as any}
                >
                  <Text fontWeight={"medium"}>
                    ご協力ありがとうございます。
                  </Text>
                  <Text fontWeight={"medium"}>
                    こちらのプランに間違いがありましたか？
                  </Text>
                  <Text>{price.clinic.name}</Text>
                  <Text>{price.name}</Text>
                  <Text>{price.price.toLocaleString()}円</Text>

                  <TextareaControl name="text" label="メモ" />
                  {complete ? (
                    <Box fontWeight={"medium"} my={10}>
                      <Text>報告頂き、誠にありがとうございます。</Text>
                      <Text>引き続き、宜しくお願い致します。</Text>
                    </Box>
                  ) : (
                    <ButtonGroup>
                      <SubmitButton bg="originBlack" _hover={{ bg: "#555" }}>
                        間違えています
                      </SubmitButton>
                    </ButtonGroup>
                  )}
                </Stack>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
