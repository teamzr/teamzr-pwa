import { Grid } from '@material-ui/core';
import * as React from 'react';

import { TextFieldComponent } from '../form/TextFieldComponent';
import UserProfileInterestsComponent from '../UserProfile/UserProfileInterestsComponent';
import DateSelect from './DateSelect';
import DurationSelect from './DurationSelect';

export function PlanSettingsFormComponent(props) {
  const [value, setValue] = React.useState('');
  const [duration, setDuration] = React.useState('');

  const handleChange = (val) => {
    setValue(val);
  };
  return (
    <Grid container direction={'column'}>
      <Grid xs={2}></Grid>
      <Grid item xs={8}>
        <Grid container direction={'column'} spacing={3}>
          <Grid item>About plan</Grid>
          <Grid item xs={12}>
            <TextFieldComponent
              value={value}
              onChange={handleChange}
              placeholder={'Name your plan'}
              maxLenght={40}
            />
          </Grid>
          <Grid item>
            <TextFieldComponent
              multiline
              value={value}
              onChange={handleChange}
              placeholder={'Describe the goal'}
              maxLenght={150}
            />
          </Grid>
          <Grid item>
            Interests
            <UserProfileInterestsComponent />
          </Grid>
          <Grid item>
            Start Date
            <DateSelect />
          </Grid>
          <Grid item>
            Default Duration
            <DurationSelect value={duration} onChange={setDuration} />
          </Grid>
          <Grid item>Reward</Grid>
        </Grid>
      </Grid>
      <Grid xs={2}></Grid>
    </Grid>
  );
}
