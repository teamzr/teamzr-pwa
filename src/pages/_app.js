import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core';

import client from '../utils/ApolloClient';
import { AuthProvider } from '../context/AuthContext';
import theme from '../theme';

function App({ Component, pageprops }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageprops} />
        </ThemeProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
