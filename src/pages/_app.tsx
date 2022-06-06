import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/templete/lauouts/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../styles/theme/theme";
import Fonts from "../../styles/theme/fonts";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
