import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/templete/lauouts/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../styles/theme/theme";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-TL6GM9GTMH`}
      ></Script>
      <Script id="ga" defer strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-TL6GM9GTMH');
        `}
      </Script>
      <Script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></Script>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
