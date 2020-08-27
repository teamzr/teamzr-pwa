import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import client from '../utils/ApolloClient';
import { AuthProvider } from '../context/AuthContext';
import theme from '../constants/DefaultTheme';

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
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <CssBaseline />
            <Component {...pageprops} />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
