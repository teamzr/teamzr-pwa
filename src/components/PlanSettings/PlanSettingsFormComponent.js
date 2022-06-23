import { Button, Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import * as React from 'react';

import { TextFieldComponent } from '../form/TextFieldComponent';
import DateSelect from './DateSelect';
import DurationSelect from './DurationSelect';
import PlanSettingsFormInterests from './PlanSettingsFormInterests';

export function PlanSettingsFormComponent(props) {
  const {
    planId,
    name,
    setName,
    description,
    setDescription,
    duration,
    setDuration,
    interests,
    setInterests,
    startDate,
    setStartDate,
    rewardDescription,
    setRewardDescription,
    handleCreatePlan,
  } = props;
  const isEditing = !!planId;

  return (
    <Grid container direction={'column'}>
      <Grid xs={2}></Grid>
      <Grid item xs={8}>
        <Grid container direction={'column'} spacing={3}>
          <Grid item>
            <Typography variant={'h6'}>About plan</Typography>
          </Grid>
          <Grid item>
            <TextFieldComponent
              value={name}
              onChange={setName}
              placeholder={'Name your plan'}
              maxlength={40}
            />
          </Grid>
          <Grid item>
            <TextFieldComponent
              multiline
              value={description}
              onChange={setDescription}
              placeholder={'Describe the goal'}
              maxlength={150}
            />
          </Grid>
          <Grid item>
            <Typography variant={'h6'}>Interests</Typography>
            <PlanSettingsFormInterests
              value={interests}
              onChange={setInterests}
            />
          </Grid>
          <Grid item>
            <Typography variant={'h6'}>Start Date</Typography>
            <DateSelect
              value={startDate}
              onChange={setStartDate}
              minDate={moment()}
            />
          </Grid>
          <Grid item>
            <Typography variant={'h6'}>Default Step Duration</Typography>
            <DurationSelect value={duration} onChange={setDuration} />
          </Grid>
          <Grid item>
            <Typography variant={'h6'}>Reward</Typography>
            <TextFieldComponent
              value={rewardDescription}
              onChange={setRewardDescription}
              placeholder={'Reward details'}
              maxlength={40}
            />
          </Grid>
          <Grid item>
            <Grid container justifyContent="center">
              <Grid item>
                {!isEditing && (
                  <Button
                    variant={'contained'}
                    color={'primary'}
                    onClick={handleCreatePlan}
                  >
                    Create plan
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={2}></Grid>
    </Grid>
  );
}
