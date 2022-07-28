import '../styles/global.css';
import GlobalStyles from './../styles/GlobalStyles';
import theme from './../styles/theme';
import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';

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
