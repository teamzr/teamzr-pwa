import {
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  Select,
  Switch,
  Typography,
} from '@material-ui/core';

import moment from 'moment';
import * as React from 'react';
import useAuthContext from '../../context/AuthContext';

import { TextFieldComponent } from '../form/TextFieldComponent';
import SelectComponent from '../SelectComponent/SelectComponent';

import DateSelect from './DateSelect';
import DurationSelect from './DurationSelect';
import PlanSettignsCoversationUsersSelect from './PlanSettingsConversationUsersSelect';
import PlanSettingsFormInterests from './PlanSettingsFormInterests';

export function PlanSettingsFormComponent(props) {
  const {
    conversationId,
    conversations,
    setConversationId,
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
    members,
    mentors,
    setMentors,
    setMembers,
    isMentored,
    setIsMentored,
    isReview,
    setIsReview,
  } = props;
  const isEditing = !!planId;

  const selectOptions = conversations?.map((t) => ({
    value: t.id,
    label: t.name,
  }));

  const me = useAuthContext();

  //TODO: remove duplicate ME conversation (type SELF)
  const optionsWithMe = [
    { label: `${me?.user?.name} (me)`, value: 'me' },
    ...selectOptions,
  ];

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
            <SelectComponent
              label={'Related conversation'}
              options={optionsWithMe}
              value={conversationId || 'me'}
              onChange={setConversationId}
              disabled={isEditing}
            />
          </Grid>
          {conversationId != 'me' && (
            <Grid item xs={12}>
              <Grid container spacing={3} direction={'column'}>
                <Grid item xs={12}>
                  <PlanSettignsCoversationUsersSelect
                    label={'Members'}
                    conversationId={conversationId}
                    value={members}
                    onChange={setMembers}
                  />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'space-around'}
                  >
                    <Grid item>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              color={'primary'}
                              checked={!!isMentored}
                              inputProps={{ checked: isMentored }}
                              onChange={(event, value) => {
                                setIsMentored(value);
                              }}
                            />
                          }
                          label="Mentored"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={!!isReview}
                              color={'primary'}
                              onChange={(event, value) => setIsReview(value)}
                            />
                          }
                          label={'Review mode'}
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Grid>
                {isMentored && (
                  <Grid item xs={12}>
                    <PlanSettignsCoversationUsersSelect
                      label={'Mentors'}
                      conversationId={conversationId}
                      value={mentors}
                      onChange={setMentors}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}
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
              minDate={!isEditing && moment()}
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
