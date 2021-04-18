import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';

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
    </>
  );
}

DefaultLayout.propTypes = {
  children: propTypes.any,
};

const useDefaultLayoutStyle = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.dark,
    marginBottom: '45px',
  },
}));

export default DefaultLayout;
