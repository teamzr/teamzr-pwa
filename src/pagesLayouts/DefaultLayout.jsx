import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, makeStyles, Box } from '@material-ui/core';

import NavigationMainBottomPanel from '../components/navigation/NavigationMainBottomPanel';

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
          {children}
        </Grid>
      </Grid>
      <Box style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
        <NavigationMainBottomPanel />
      </Box>
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
