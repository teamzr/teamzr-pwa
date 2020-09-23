import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, Box } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';

import client from '../utils/ApolloClient';
import { AuthProvider } from '../context/AuthContext';
import theme from '../constants/DefaultTheme';
import NavigationMainBottomPanel from '../components/navigation/NavigationMainBottomPanel';

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
        <DndProvider backend={DndProvider}>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <CssBaseline />
              <Component {...pageprops} />

              <NavigationMainBottomPanel />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </DndProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
