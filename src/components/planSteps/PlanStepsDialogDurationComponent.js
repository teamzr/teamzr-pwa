import * as React from 'react';
import propTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';

function PlanStepsDialogDurationComponent(props) {
  const { duration, handleUpdate } = props;

  const hadleDurationClick = React.useCallback(
    (value) => {
      handleUpdate({
        duration: value,
      });
    },
    [handleUpdate]
  );

  return (
    <Grid container direction={'row'} spacing={2}>
      <Grid item>
        <Button
          color={'primary'}
          variant={duration == 'DAY' ? 'contained' : 'outlined'}
          onClick={() => hadleDurationClick('DAY')}
        >
          1 day
        </Button>
      </Grid>
      <Grid item>
        <Button
          color={'primary'}
          variant={duration == 'WEEK' ? 'contained' : 'outlined'}
          onClick={() => hadleDurationClick('WEEK')}
        >
          1 Week
        </Button>
      </Grid>
      <Grid item>
        <Button
          color={'primary'}
          variant={duration == 'WEEK2' ? 'contained' : 'outlined'}
          onClick={() => hadleDurationClick('WEEK2')}
        >
          2 Week
        </Button>
      </Grid>
      <Grid item>
        <Button
          color={'primary'}
          variant={duration == 'MONTH' ? 'contained' : 'outlined'}
          onClick={() => hadleDurationClick('MONTH')}
        >
          1 Month
        </Button>
      </Grid>
    </Grid>
  );
}

PlanStepsDialogDurationComponent.propTypes = {
  handleUpdate: propTypes.func,
  duration: propTypes.string,
};

export default PlanStepsDialogDurationComponent;
