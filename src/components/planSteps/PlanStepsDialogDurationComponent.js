import * as React from 'react';
import propTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';
import MyPlansConversationFilterButton from '../plans/MyPlansConversationFilterButton';

function PlanStepsDialogDurationComponent(props) {
  const [duration, setDuration] = React.useState('1week');

  const hadleDurationClick = React.useCallback(
    (d) => {
      setDuration(d);
    },
    [setDuration]
  );

  return (
    <Grid container direction={'row'} spacing={2}>
      <Grid item>
        <Button
          color={'primary'}
          variant={duration == '1week' ? 'contained' : 'outlined'}
          onClick={() => hadleDurationClick('1week')}
        >
          1 Week
        </Button>
      </Grid>
      <Grid item>
        <Button
          color={'primary'}
          variant={duration == '2weeks' ? 'contained' : 'outlined'}
          onClick={() => hadleDurationClick('2weeks')}
        >
          2 Week
        </Button>
      </Grid>
      <Grid item>
        <Button
          color={'primary'}
          variant={duration == '1month' ? 'contained' : 'outlined'}
          onClick={() => hadleDurationClick('1month')}
        >
          1 Month
        </Button>
      </Grid>
    </Grid>
  );
}

export default PlanStepsDialogDurationComponent;
