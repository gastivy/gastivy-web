import "react-datepicker/dist/react-datepicker.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Flex } from "astarva-ui";
import type { AppProps } from "next/app";
import Head from "next/head";

import usePageRender from "@/hooks/usePageRender";
import { GlobalStyle } from "@/styles/global-styled";

export default function App({ Component, pageProps }: AppProps) {
  const { isReadyMounted } = usePageRender();
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <QueryClientProvider client={queryClient}>
          <Flex>
            <GlobalStyle />
            {isReadyMounted && <Component {...pageProps} />}
          </Flex>
        </QueryClientProvider>
      </main>
    </>
  );
}
