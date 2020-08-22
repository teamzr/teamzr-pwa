import * as React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

function LoadingIndicatorComponent() {
  return (
    <Grid container justify={'center'}>
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

export default LoadingIndicatorComponent;
