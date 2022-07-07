import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';
import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import GlobalStyles from './../styles/GlobalStyles';
import theme from './../styles/theme';
import { ThemeProvider } from '@mui/material';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>VisRecLy</title>
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
