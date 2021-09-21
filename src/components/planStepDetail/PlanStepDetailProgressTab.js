import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, TextField, Typography } from '@material-ui/core';
import FulfillmentChipBarAdapter from '../../adapters/FulfillmentChipBarAdapter';

function PlanStepDetailProgressTab(props) {
  const { planStepId, status } = props;
  return (
    <Grid
      container
      direction={'column'}
      alignContent={'center'}
      style={{ margin: '10px 0 0 0' }}
    >
      <Grid item>
        <FulfillmentChipBarAdapter planStepId={planStepId} status={status} />
      </Grid>
    </Grid>
  );
}

export default PlanStepDetailProgressTab;
