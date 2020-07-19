import * as React from "react";
import Router from "next/router";

import client from "../utils/ApolloClient";
import { AuthProvider } from "../context/AuthContext";
import { ApolloProvider } from "@apollo/client";

function App({ Component, pageprops }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Component {...pageprops} />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
