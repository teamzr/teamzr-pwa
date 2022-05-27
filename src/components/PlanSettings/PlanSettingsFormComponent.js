import { Grid } from '@material-ui/core';
import * as React from 'react';

import { TextFieldComponent } from '../form/TextFieldComponent';
import DateSelect from './DateSelect';
import DurationSelect from './DurationSelect';
import PlanSettingsFormInterests from './PlanSettingsFormInterests';

export function PlanSettingsFormComponent(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [duration, setDuration] = React.useState('DAY');
  const [interests, setInterests] = React.useState([]);

  return (
    <Grid container direction={'column'}>
      <Grid xs={2}></Grid>
      <Grid item xs={8}>
        <Grid container direction={'column'} spacing={3}>
          <Grid item>About plan</Grid>
          <Grid item xs={12}>
            <TextFieldComponent
              value={name}
              onChange={setName}
              placeholder={'Name your plan'}
              maxLenght={40}
            />
          </Grid>
          <Grid item>
            <TextFieldComponent
              multiline
              value={description}
              onChange={setDescription}
              placeholder={'Describe the goal'}
              maxLenght={150}
            />
          </Grid>
          <Grid item>
            Interests
            <PlanSettingsFormInterests
              value={interests}
              onChange={setInterests}
            />
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
