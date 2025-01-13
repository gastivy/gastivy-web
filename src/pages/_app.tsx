import "react-datepicker/dist/react-datepicker.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Flex } from "astarva-ui";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import type { AppProps } from "next/app";
import Head from "next/head";

import usePageRender from "@/hooks/usePageRender";
import { GlobalStyle } from "@/styles/global-styled";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function App({ Component, pageProps }: AppProps) {
  const { isReadyMounted } = usePageRender();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <>
      <Head>
        <title>Gastivy - App</title>
        <meta name="description" content="Manage Your Needs" />
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
