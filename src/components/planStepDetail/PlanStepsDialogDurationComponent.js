import * as React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import { Grid, Typography } from '@material-ui/core';
import ChipSelectComponent from '../ChipSelectComponent/ChipSelectComponent';

function PlanStepsDialogDurationComponent(props) {
  const { duration, handleUpdate, planStep } = props;

  const handleDurationClick = (value) => {
    handleUpdate({
      duration: value,
    });
  };

  console.log(planStep);
  const options = [
    { value: 'DAY', label: '1 Day' },
    { value: 'WEEK', label: '1 Week' },
    { value: 'WEEK2', label: '2 Weeks' },
    { value: 'MONTH', label: '1 Month' },
  ];
  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <ChipSelectComponent
          options={options}
          value={duration}
          onChange={handleDurationClick}
        />
      </Grid>
      <Grid item>
        <Typography variant={'text'}>
          Starts:{' '}
          {moment(new Date(planStep.startDate))
            .utc()
            .format('DD.MM.YYYY HH:mm:ss')}
          ; Ends:{' '}
          {planStep.endDate
            ? moment(new Date(planStep.endDate))
                .utc()
                .format('DD.MM.YYYY HH:mm:ss')
            : null}
        </Typography>
      </Grid>
    </Grid>
  );
}

PlanStepsDialogDurationComponent.propTypes = {
  handleUpdate: propTypes.func,
  duration: propTypes.string,
};

export default PlanStepsDialogDurationComponent;
