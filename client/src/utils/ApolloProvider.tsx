import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider as Provider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function ApolloProvider({ children }) {
  return <Provider client={client}>{children}</Provider>;
}
