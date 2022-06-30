import {
  Box,
  ButtonGroup,
  Center,
  Heading,
  Radio,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BgImgH1 } from "components/atoms/text/BgImgH1";
import { Formik } from "formik";
import {
  InputControl,
  ResetButton,
  SubmitButton,
  TextareaControl,
} from "formik-chakra-ui";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import * as Yup from "yup";

type Contact = {
  name: string;
  email: string;
  text: string;
};

const Form = () => {
  const [complete, setComplete] = useState<boolean>(false);

  // const onSubmit = (values: Contact) => {
  //   window.alert(JSON.stringify(values, null, 2));
  //   setComplete(true);
  // };

  const initialValues: Contact = {
    name: "",
    email: "",
    text: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("お名前は必須です"),
    email: Yup.string()
      .email("メールアドレスの形式が違います")
      .required("メールアドレスは必須です"),
    text: Yup.string().required("内容は必須です"),
  });

  const onSubmit = async (value: Contact) => {
    // values.preventDefault()
    try {
      const res = await fetch("/api/send", {
        body: JSON.stringify({
          name: value.name,
          email: value.email,
          text: value.text,
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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors }) => (
        <Box>
          <Head>
            <title>お問合せ | 脱毛コンサルタント</title>
          </Head>
          <BgImgH1 title="お問合せ" />
          <Stack mt="1.5rem" spacing={"1rem"}>
            <Text textAlign="center">
              掲載に関して何かございましたら、お気軽にお問合せください。
            </Text>
            <Text textAlign="center">1週間以内に折り返しご連絡致します。</Text>
          </Stack>
          <Stack
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
            <InputControl name="name" label="お名前" />
            <InputControl name="email" label="メールアドレス" />
            <TextareaControl name="text" label="お問合せ内容" />
            {complete ? (
              <Box marginY={10}>送信完了</Box>
            ) : (
              <ButtonGroup>
                <SubmitButton bg="originBlack" _hover={{ bg: "#555" }}>
                  送信
                </SubmitButton>
                <ResetButton color="originBlack" _hover={{ bg: "#eee" }}>
                  クリア
                </ResetButton>
              </ButtonGroup>
            )}
          </Stack>
        </Box>
      )}
    </Formik>
  );
};

export default Form;
