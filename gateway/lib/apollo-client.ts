// gateway/lib/apollo-client.ts

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  "http://localhost:3000/api/graphql";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
    }),
    cache: new InMemoryCache(),
    ssrMode: typeof window === "undefined",
  });
};

export default createApolloClient;
