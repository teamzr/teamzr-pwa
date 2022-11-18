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
import AppBarComponent, {
  APP_BAR_LEVEL,
} from '../components/AppBarComponent/AppBarComponent';
import { useRouter } from 'next/router';
import PlanListItemPopperComponent from '../components/plans/PlanListItemPopoverComponent';
import EditPlanPopover from '../components/plans/EditPlanPopover';

function App({ Component, pageprops }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const router = useRouter();

  let appBarEndComponent = <></>;
  let appBarLevel = APP_BAR_LEVEL.PRIMARY;
  if (router.asPath.includes('plans/')) {
    appBarLevel = APP_BAR_LEVEL.SECONDARY;
    const { planId } = router.query;
    appBarEndComponent = (
      <>
        <EditPlanPopover fill={'white'} planId={planId} />
      </>
    );
  }

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
                <AppBarComponent level={appBarLevel} end={appBarEndComponent} />
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
