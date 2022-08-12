import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/templete/lauouts/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../styles/theme/theme";
import Head from "next/head";
import Script from "next/script";
import { LoadingModalIcon } from "components/atoms/icons/LoadingModalIcon";
import { useRouter } from "next/router";
import { Gender } from "types/Gender";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const gender = (router.query.gender as Gender) || "lady";

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name="theme-color" content={"#111111"} />
        <meta
          name="google-site-verification"
          content="Wzt1e8X-GdJRd-dyZxrwBUbKNNNjn_W6b0c2E7k3XN0"
        />
        <meta httpEquiv="Content-Security-Policy"></meta>
      </Head>
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
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2833905872269108"
        crossOrigin="anonymous"
      ></Script>
      {/* <Script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></Script> */}
      <Layout>
        <LoadingModalIcon />
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
