import * as React from 'react';
import propTypes from 'prop-types';
import { NEW_CAMPAING_STEPS } from './NewCampaignComponent';
import { Grid, TextField, Typography, Button } from '@material-ui/core';

function NewCampaignDetailsStepComponent(props) {
  const { data, onDataChange, setStep } = props;
  const { name, description } = data;

  const handleChange = React.useCallback(
    (event) => {
      const name = event.target.name;
      const value = event.target.value;

      onDataChange(name, value);
    },
    [onDataChange]
  );

  const handleNextClick = React.useCallback(() => {
    setStep(NEW_CAMPAING_STEPS.START_DATE);
  }, []);

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <Typography variant={'h5'}>Campaign Name & Description</Typography>
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          value={name}
          onChange={handleChange}
          name={'name'}
          label={`Name (${name.length} characters out of 30 max)`}
          inputProps={{ maxlength: 30 }}
        />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          multiline
          value={description}
          onChange={handleChange}
          name={'description'}
          label={`Description (${description.length} characters out of 200 max)`}
          inputProps={{ maxlength: 200 }}
        />
      </Grid>
      <Grid item>
        <Grid container direction={'row'} justify={'space-between'}>
          <Grid item></Grid>
          <Grid item>
            <Button
              variant={'contained'}
              onClick={handleNextClick}
              disabled={name && description ? false : true}
            >
              {'>'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
NewCampaignDetailsStepComponent.propTypes = {
  setStep: propTypes.func,
  onChange: propTypes.func,
};

export default NewCampaignDetailsStepComponent;
