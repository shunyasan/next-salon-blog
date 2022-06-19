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
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2833905872269108"
          crossOrigin="anonymous"
        ></script>
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-TL6GM9GTMH`}
        ></script>
        <script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-TL6GM9GTMH');
        `}
        </script>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
