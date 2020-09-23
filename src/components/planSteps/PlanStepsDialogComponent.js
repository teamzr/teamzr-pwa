import * as React from 'react';
import propTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/client';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';

const GET_PLANSTEP_QUERY = gql`
  query planStep($id: ID!) {
    planStep(id: $id) {
      id
      name
      description
      status
      number
    }
  }
`;

export const UPDATE_PLAN_STEP_MUTATION = gql`
  mutation updatePlanStep($input: PlanStepUpdateInput!) {
    updatePlanStep(input: $input) {
      id
      name
      description
      number
      status
      parent {
        id
        name
      }
    }
  }
`;

const PlanStepsDialogComponent = (props) => {
  const { planStepId, handleClose } = props;

  const [planStepState, setPlanStepState] = React.useState({
    name: '',
    description: '',
  });

  const { loading, error, data } = useQuery(GET_PLANSTEP_QUERY, {
    variables: {
      id: planStepId,
    },
  });

  React.useEffect(() => {
    if (!loading) {
      setPlanStepState({
        name: data.planStep.name,
        description: data.planStep.description,
      });
    }
  }, [loading, data]);

  const [updatePlanStep] = useMutation(UPDATE_PLAN_STEP_MUTATION);

  const handleUpdate = React.useCallback(async () => {
    const { name, description } = planStepState;
    await updatePlanStep({
      variables: { input: { id: planStepId, name, description } },
    });
    handleClose();
  }, [planStepId, planStepState, updatePlanStep, handleClose]);

  const handleValueChange = React.useCallback(
    (event) => {
      const target = event.target;

      setPlanStepState({ ...planStepState, [target.name]: target.value });
    },
    [planStepState, setPlanStepState]
  );

  if (loading) return '...';
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={!!planStepId}
      scroll={'body'}
      fullWidth={true}
      maxWidth={'xs'}
    >
      <DialogTitle>{`Step ${data.planStep.number} ${planStepState.name}`}</DialogTitle>
      <DialogContent>
        <Grid container direction={'column'}>
          <Grid item>
            <TextField
              fullWidth
              value={planStepState.name}
              onChange={handleValueChange}
              label={'Step name'}
              name={'name'}
              autoComplete={'off'}
              InputProps={{ autoComplete: 'off' }}
              inputProps={{ autoComplete: 'off' }}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label={'Step description'}
              name={'description'}
              value={planStepState.description}
              onChange={handleValueChange}
              autoComplete={'off'}
              InputProps={{ autoComplete: 'off' }}
              inputProps={{ autoComplete: 'off' }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant={'outlined'} onClick={handleClose}>
          Cancel
        </Button>
        <Button variant={'contained'} color={'primary'} onClick={handleUpdate}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

PlanStepsDialogComponent.propTypes = {
  stepId: propTypes.string,
  handleClose: propTypes.func,
};

export default PlanStepsDialogComponent;
