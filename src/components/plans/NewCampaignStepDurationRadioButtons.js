import * as React from 'react';
import propTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

function NewCampaignStepDurationRadioButtons(props) {
  const { value, onChange } = props;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Step Duration</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="stepDuration"
        value={value}
        onChange={onChange}
      >
        <FormControlLabel
          value={'7'}
          control={<Radio color={'primary'} />}
          label="1 week"
        />
        <FormControlLabel
          value={'14'}
          control={<Radio color={'primary'} />}
          label="2 weeks (default)"
        />
        <FormControlLabel
          value={'30'}
          control={<Radio color={'primary'} />}
          label="1 month"
        />
      </RadioGroup>
    </FormControl>
  );
}

NewCampaignStepDurationRadioButtons.propTypes = {
  value: propTypes.number,
  onChange: propTypes.func,
};

export default NewCampaignStepDurationRadioButtons;
