import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, Typography, Button } from '@material-ui/core';

import NewCampaignStepDurationRadioButtons from './NewCampaignStepDurationRadioButtons';
import { NEW_CAMPAING_STEPS } from './NewPlanComponent';

function NewCampaignDurationStepComponent(props) {
  const { data, onDataChange, setStep } = props;
  const { stepDuration } = data;

  const handleChange = React.useCallback((event) => {
    onDataChange(event.target.name, event.target.value);
  }, []);
  const handleNextClick = React.useCallback(() => {
    setStep(NEW_CAMPAING_STEPS.REWARD);
  }, []);

  const handleBackClick = React.useCallback(() => {
    setStep(NEW_CAMPAING_STEPS.START_DATE);
  }, []);

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <Typography variant={'h5'}>Default Duration of New Step</Typography>
      </Grid>
      <Grid item>
        <NewCampaignStepDurationRadioButtons
          onChange={handleChange}
          value={stepDuration}
        />
      </Grid>

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

NewCampaignDurationStepComponent.propTypes = {
  data: propTypes.array,
  setStep: propTypes.func,
  onDataChange: propTypes.func,
};

export default NewCampaignDurationStepComponent;
