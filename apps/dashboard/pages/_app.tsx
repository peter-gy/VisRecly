import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';
import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import GlobalStyles from './../styles/GlobalStyles';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>VisRecLy</title>
      </Head>
      <main className="app">
        <CacheProvider value={cache}>
          <GlobalStyles />
          <Component {...pageProps} />
        </CacheProvider>
      </main>
    </>
  );
}

export default CustomApp;
