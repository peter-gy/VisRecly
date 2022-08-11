import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from '@mui/material';

import { RecInputProvider } from '@dashboard/modules/rec-input/provider/RecInputContext';
import { RecOutputProvider } from '@dashboard/modules/rec-output/provider/RecOutputContext';
import GlobalStyles from '@dashboard/styles/GlobalStyles';
import '@dashboard/styles/global.css';
import theme from '@dashboard/styles/theme';

const queryClient = new QueryClient();

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Visrecly</title>
      </Head>
      <main className="app">
        <CacheProvider value={cache}>
          <GlobalStyles />
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <RecInputProvider>
                <RecOutputProvider>
                  <Component {...pageProps} />
                </RecOutputProvider>
              </RecInputProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </CacheProvider>
      </main>
    </>
  );
}

export default CustomApp;
