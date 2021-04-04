import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, Typography, Button, TextField } from '@material-ui/core';

import { NEW_CAMPAING_STEPS } from './NewPlanComponent';

function NewPlanRewardStepComponent(props) {
  const { data, onDataChange, setStep } = props;
  const { rewardDescription } = data;

  const handleChange = (event) => {
    onDataChange(event.target.name, event.target.value);
  };

  const handleBackClick = () => {
    setStep(NEW_CAMPAING_STEPS.STEP_DURATION);
  };

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <Typography variant={'h5'}>Reward</Typography>
        <Typography>
          Define what will the participants rewarded with, after finishing the
          campaign
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          fullWidth
          inputProps={{ style: { height: 140 } }}
          name={'rewardDescription'}
          value={rewardDescription}
          onChange={handleChange}
          placeholder={'Describe the reward'}
        />
      </Grid>

      <Grid item>
        <Grid container direction={'row'} justify={'space-between'}>
          <Grid item>
            <Button variant={'contained'} onClick={handleBackClick}>
              {'<'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

NewPlanRewardStepComponent.propTypes = {
  data: propTypes.array,
  setStep: propTypes.func,
  onDataChange: propTypes.func,
};

export default NewPlanRewardStepComponent;
