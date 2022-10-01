import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

import Layout from "../src/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Knockadoon Youth Week</title>
        <link rel="icon" href="/images/kywlogo.png" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  );
}

export default MyApp;
