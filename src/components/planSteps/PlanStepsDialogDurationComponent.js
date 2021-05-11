import * as React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import { Grid, Typography } from '@material-ui/core';
import ChipSelectComponent from '../ChipSelectComponent/ChipSelectComponent';

function PlanStepsDialogDurationComponent(props) {
  const { duration, handleUpdate, stepData } = props;

  const handleDurationClick = (value) => {
    handleUpdate({
      duration: value,
    });
  };

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
          Starts: {moment(stepData.startDate).format('DD.MM.YYYY')}; Ends:{' '}
          {moment(moment(stepData.endDate)).format('DD.MM.YYYY')}
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
