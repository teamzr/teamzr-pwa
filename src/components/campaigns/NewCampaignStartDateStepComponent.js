import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, Typography, Button } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';

import { NEW_CAMPAING_STEPS } from './NewCampaignComponent';

function NewCampaignStartDateStepComponent(props) {
  const { data, setStep, onDataChange } = props;
  const { startDate } = data;

  const handleDateChange = React.useCallback((value) => {
    onDataChange('startDate', value.toISOString());
  }, []);

  const handleBackClick = React.useCallback(() => {
    setStep(NEW_CAMPAING_STEPS.DETAILS);
  }, []);

  const handleNextClick = React.useCallback(() => {
    setStep(NEW_CAMPAING_STEPS.STEP_DURATION);
  }, []);
  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <Typography variant={'h5'}>Start Date</Typography>
      </Grid>
      <KeyboardDatePicker
        format={'DD/MM/YY'}
        value={startDate}
        minDate={moment()}
        onChange={handleDateChange}
      />
      <Grid item>
        <Grid container direction={'row'} justify={'space-between'}>
          <Grid item>
            <Button variant={'contained'} onClick={handleBackClick}>
              {'<'}
            </Button>
          </Grid>
          <Grid item>
            <Button variant={'contained'} onClick={handleNextClick}>
              {'>'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

NewCampaignStartDateStepComponent.proTypes = {
  setStep: propTypes.func,
  onDataChange: propTypes.func,
};

export default NewCampaignStartDateStepComponent;
