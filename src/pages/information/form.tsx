import { Box, ButtonGroup, Radio, Stack } from "@chakra-ui/react";
import { Formik } from "formik";
import {
  InputControl,
  ResetButton,
  SubmitButton,
  TextareaControl,
} from "formik-chakra-ui";
import { NextPage } from "next";
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
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    text: Yup.string().required(),
  });

  const onSubmit = async (value: Contact) => {
    // values.preventDefault()
    const res = fetch("/api/send", {
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

    const result = await res
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(result);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors }) => (
        <Stack
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={800}
          p={6}
          spacing="1em"
          as="form"
          onSubmit={handleSubmit as any}
        >
          <InputControl name="name" label="お名前" />
          <InputControl name="email" label="メールアドレス" />
          <TextareaControl name="text" label="お問合せ内容" />
          {complete ? (
            <Box marginY={10}>送信完了</Box>
          ) : (
            <ButtonGroup>
              <SubmitButton>Submit</SubmitButton>
              <ResetButton>Reset</ResetButton>
            </ButtonGroup>
          )}
        </Stack>
      )}
    </Formik>
  );
};

export default Form;
