import * as React from 'react';
import propTypes from 'prop-types';
import PlanStepsDialogSubstepsComponent from './PlanStepsDialogSubstepsComponent';
import PlanStepsDialogDurationComponent from './PlanStepsDialogDurationComponent';
import {
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/client';
import { PLAN_STEP_STATUSES } from '../planSteps/PlanStepsConstants';
import { TikTokEmbed, YouTubeEmbed } from 'react-social-media-embed';
import { CloseRounded } from '@material-ui/icons';

export const UPDATE_PLAN_STEP_MUTATION = gql`
  mutation updatePlanStep($input: PlanStepUpdateInput!) {
    updatePlanStep(input: $input) {
      id
      name
      description
      startDate
      endDate
      number
      status
      duration
      tikTokVideoUrl
      fulfillments {
        id
        value
        user {
          id
          avatar
        }
      }
      plan {
        id
        steps {
          id
          name
          description
          number
          startDate
          endDate
          duration
          status
          fulfillments {
            id
            value
            user {
              id
              avatar
            }
          }
        }
      }
      parent {
        id
      }
    }
  }
`;

function PlanStepDetailSettingsTab(props) {
  const { planStepId, stepData } = props;
  const planStep = stepData.planStep;

  const isViewOnly = planStep.status == PLAN_STEP_STATUSES.COMPLETED;

  const [planStepState, setPlanStepState] = React.useState({
    name: '',
    description: '',
    tikTokVideoUrl: '',
  });
  React.useEffect(() => {
    setPlanStepState({
      name: planStep.name,
      description: planStep.description,
      duration: planStep.duration,
      tikTokVideoUrl: planStep.tikTokVideoUrl,
    });
  }, [planStep]);

  const [updatePlanStep] = useMutation(UPDATE_PLAN_STEP_MUTATION);

  const handleValueChange = (event) => {
    const target = event.target;

    setPlanStepState({ ...planStepState, [target.name]: target.value });
  };

  const handleUpdate = async (values) => {
    const inputVariables = values ? values : planStepState;

    await updatePlanStep({
      variables: { input: { id: planStepId, ...inputVariables } },
    });
  };

  React.useEffect(() => {
    if (planStepState.tikTokVideoUrl) {
      handleUpdate();
    }
  }, [planStepState.tikTokVideoUrl]);

  const onBlur = () => {
    handleUpdate();
  };

  const removeVideo = () => {
    handleValueChange({
      target: { name: 'tikTokVideoUrl', value: '' },
    });

    handleUpdate({ ...planStepState, tikTokVideoUrl: '' });
  };

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <TextField
          disabled={isViewOnly}
          fullWidth
          style={{ borderRadius: '12px' }}
          value={planStepState.name}
          onChange={handleValueChange}
          placeholder={'Step name'}
          name={'name'}
          autoComplete={'off'}
          InputProps={{ autoComplete: 'off' }}
          inputProps={{ autoComplete: 'off' }}
          onBlur={onBlur}
        />
      </Grid>
      <Grid item>
        <TextField
          disabled={isViewOnly}
          multiline
          rows={3}
          rowsMax={6}
          fullWidth
          placeholder={'Describe step briefly'}
          name={'description'}
          value={planStepState.description}
          onChange={handleValueChange}
          autoComplete={'off'}
          InputProps={{ autoComplete: 'off' }}
          inputProps={{ autoComplete: 'off' }}
          onBlur={onBlur}
        />
      </Grid>
      <Grid item>
        {!planStepState.tikTokVideoUrl && (
          <>
            <TextField
              disabled={isViewOnly}
              rows={1}
              fullWidth
              placeholder={'Youtube / TikTok Url'}
              name={'tikTokVideoUrl'}
              value={planStepState.tikTokVideoUrl}
              onChange={(e) => {
                handleValueChange(e);
              }}
              autoComplete={'off'}
              InputProps={{ autoComplete: 'off' }}
              inputProps={{ autoComplete: 'off' }}
              onBlur={onBlur}
            />
          </>
        )}
        {!!planStepState.tikTokVideoUrl && (
          <Box>
            <IconButton styl onClick={removeVideo}>
              <CloseRounded />
            </IconButton>
            {planStepState.tikTokVideoUrl.includes('tiktok') && (
              <TikTokEmbed url={planStepState.tikTokVideoUrl} />
            )}
            {planStepState.tikTokVideoUrl.includes('youtu') && (
              <YouTubeEmbed url={planStepState.tikTokVideoUrl} />
            )}
          </Box>
        )}
      </Grid>
      {false && (
        <Grid item xs={12}>
          <Typography variant={'h6'}>Substeps</Typography>
          <PlanStepsDialogSubstepsComponent />
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography variant={'h6'}>Duration</Typography>
        <PlanStepsDialogDurationComponent
          disabled={isViewOnly}
          duration={planStepState.duration}
          handleUpdate={handleUpdate}
          planStep={planStep}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant={'h6'}>Reward</Typography>
      </Grid>
    </Grid>
  );
}

//PlanStepDetailSettingsTab.propTypes = {};

export default PlanStepDetailSettingsTab;
