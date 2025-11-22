import React from 'react';
import { ApolloProvider } from "@apollo/client/react";
import type { AppProps } from 'next/app';
import createApolloClient from '../lib/apollo-client'; // Default import

const client = createApolloClient();

function MyApp({ Component, pageProps }: AppProps) {
  return React.createElement(
    ApolloProvider,
    { client },
    React.createElement(Component, pageProps)
  );
}

export default MyApp;