import * as React from 'react';
import propTypes from 'prop-types';
import {
  Grid,
  makeStyles,
  Box,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';

import NavigationMainBottomPanel from '../components/navigation/NavigationMainBottomPanel';
import AppBarComponent from '../components/AppBarComponent/AppBarComponent';

function DefaultLayout(props) {
  const { children } = props;

  const classes = useDefaultLayoutStyle();

  return (
    <>
      <Grid
        container
        direction={'row'}
        className={classes.container}
        justify={'center'}
      >
        <Grid item xs={12}>
          <AppBarComponent />
          {children}
        </Grid>
      </Grid>
    </>
  );
}

DefaultLayout.propTypes = {
  children: propTypes.any,
};

const useDefaultLayoutStyle = makeStyles((theme) => ({
  container: {
    height: '100vh',
    backgroundColor: theme.palette.secondary.dark,
  },
}));

export default DefaultLayout;
