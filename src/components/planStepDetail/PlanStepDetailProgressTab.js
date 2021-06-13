import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, TextField, Typography } from '@material-ui/core';

import FullfilmentChipBarSelect from './FullfilmentChipBarSelect';

function PlanStepDetailProgressTab() {
  return (
    <Grid container direction={'column'} style={{ margin: '10px 0 0 0' }}>
      <Grid item>
        <Typography>Your fullfilment</Typography>
      </Grid>
      <Grid item>
        <FullfilmentChipBarSelect />
      </Grid>
    </Grid>
  );
}

export default PlanStepDetailProgressTab;
