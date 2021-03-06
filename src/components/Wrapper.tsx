import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import React from 'react';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient, ApolloProvider } from '@apollo/client';

import { Layout } from '../components/layout/Layout';
import { theme } from '../theme/theme';
import { UnauthentificatedModalProvider } from './auth/UnauthentificatedModal';

interface WrapperProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, apolloClient }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <UnauthentificatedModalProvider>
          <Layout>{children}</Layout>
        </UnauthentificatedModalProvider>
        <style global jsx>
          {`
            html,
            body,
            body > div:first-child,
            div#__next,
            div#__next > div {
              height: 100%;
            }
            ul {
              list-style-type: none;
            }
            html {
            }
          `}
        </style>
      </ThemeProvider>
    </ApolloProvider>
  );
};
