import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, Box } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import isTouchDevice from 'is-touch-device';

import client from '../utils/ApolloClient';
import { AuthProvider } from '../context/AuthContext';
import theme from '../constants/DefaultTheme';
import NavigationMainBottomPanel from '../components/navigation/NavigationMainBottomPanel';
import Head from 'next/head';
import { COLORS } from '../constants/Colors';
import AppBarComponent from '../components/AppBarComponent/AppBarComponent';

function App({ Component, pageprops }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <Head>
        <link rel="shortcut icon" type="image/png" href="favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:300,400,700,800,Regular"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.webmanifest"></link>
        <style>{`body { margin: 0 } /* custom! */`}</style>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <meta name="theme-color" content={COLORS.primaryLight} />
      </Head>
      <AuthProvider>
        <ApolloProvider client={client}>
          <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
            <ThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <CssBaseline />
                <AppBarComponent />
                <Component {...pageprops} />

                <NavigationMainBottomPanel />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </DndProvider>
        </ApolloProvider>
      </AuthProvider>
    </>
  );
}

export default App;
