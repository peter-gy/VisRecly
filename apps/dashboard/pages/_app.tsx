import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'intro.js/introjs.css';
import { AppProps } from 'next/app';

import { ThemeProvider } from '@mui/material';

import { LayoutProvider } from '@dashboard/modules/layout/provider/LayoutContext';
import { RecInputProvider } from '@dashboard/modules/rec-input/provider/RecInputContext';
import { RecOutputProvider } from '@dashboard/modules/rec-output/provider/RecOutputContext';
import { RecSelectionProvider } from '@dashboard/modules/rec-selection/provider/RecSelectionContext';
import GlobalStyles from '@dashboard/styles/GlobalStyles';
import '@dashboard/styles/global.css';
import theme from '@dashboard/styles/theme';

const queryClient = new QueryClient();

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className="app">
        <CacheProvider value={cache}>
          <GlobalStyles />
          <ThemeProvider theme={theme}>
            <LayoutProvider>
              <QueryClientProvider client={queryClient}>
                <RecInputProvider>
                  <RecOutputProvider>
                    <RecSelectionProvider>
                      <Component {...pageProps} />
                    </RecSelectionProvider>
                  </RecOutputProvider>
                </RecInputProvider>
              </QueryClientProvider>
            </LayoutProvider>
          </ThemeProvider>
        </CacheProvider>
      </main>
    </>
  );
}

export default CustomApp;
