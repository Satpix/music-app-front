import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';

import { wrapper } from '../store';
import '../styles/global.css';

import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

interface ThemeInterface {
  colors: {
    primary: string,
    secondary: string,
  }
}

const theme: ThemeInterface = {
  colors: {
    primary: '#0070f3',
    secondary: '#228B22',
  },
}

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...props.pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;