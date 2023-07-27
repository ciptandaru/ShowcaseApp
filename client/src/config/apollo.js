import {ApolloClient, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://c2p3.ciptadr.site",
  cache: new InMemoryCache(),
});
