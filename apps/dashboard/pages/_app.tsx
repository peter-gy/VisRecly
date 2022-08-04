import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from '@mui/material';

import GlobalStyles from '@dashboard/styles/GlobalStyles';
import '@dashboard/styles/global.css';
import theme from '@dashboard/styles/theme';

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
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </main>
    </>
  );
}

export default CustomApp;
