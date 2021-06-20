import * as React from 'react';
import propTypes from 'prop-types';
import PlanStepsDialogSubstepsComponent from './PlanStepsDialogSubstepsComponent';
import PlanStepsDialogDurationComponent from './PlanStepsDialogDurationComponent';
import { Grid, TextField, Typography } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/client';
import { PLAN_STEP_STATUSES } from '../planSteps/PlanStepsConstants';

export const UPDATE_PLAN_STEP_MUTATION = gql`
  mutation updatePlanStep($input: PlanStepUpdateInput!) {
    updatePlanStep(input: $input) {
      id
      name
      description
      number
      status
      duration
      startDate
      endDate
      parent {
        id
        name
      }
    }
  }
`;

function PlanStepDetailSettingsTab(props) {
  const { planStepId, stepData } = props;
  const planStep = stepData.planStep;

  const [planStepState, setPlanStepState] = React.useState({
    name: '',
    description: '',
  });
  React.useEffect(() => {
    setPlanStepState({
      name: planStep.name,
      description: planStep.description,
      duration: planStep.duration,
      status:
        planStep.status == PLAN_STEP_STATUSES.UNDEFINED
          ? PLAN_STEP_STATUSES.UPCOMING
          : planStep.status,
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

  const onBlur = () => {
    handleUpdate();
  };

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <Typography variant={'h6'}>About</Typography>
        <TextField
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
      <Grid item xs={12}>
        <Typography variant={'h6'}>Substeps</Typography>
        <PlanStepsDialogSubstepsComponent />
      </Grid>
      <Grid item xs={12}>
        <Typography variant={'h6'}>Duration</Typography>
        <PlanStepsDialogDurationComponent
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
