import * as React from 'react';
import propTypes from 'prop-types';
import { AddStepIcon, PlusIcon } from '../../constants/Icons';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useApolloClient, useMutation } from '@apollo/client';

const CREATE_PLAN_TASK_MUTATION = gql`
  mutation createPlanStep($input: PlanStepCreateInput!) {
    createPlanStep(input: $input) {
      id
      name
      description
      plan {
        id
        name
        description
      }
      parent {
        id
      }
    }
  }
`;

const PLAN_QUERY = gql`
  query plan($planId: ID!) {
    plan(id: $planId) {
      id
      name
      description
      steps {
        id
        name
        description
      }
    }
  }
`;

function PlanStepsComponentAddStepBtn(props) {
  const { parentId, planId } = props;

  const [inputState, setInputState] = React.useState({
    name: '',
    description: '',
  });
  const apolloCLient = useApolloClient();
  const [createPlanStep] = useMutation(CREATE_PLAN_TASK_MUTATION, {
    update: (cache, { data: { createPlanStep } }) => {
      const { plan } = cache.readQuery({
        query: PLAN_QUERY,
        variables: { planId },
      });

      const newPlan = { ...plan };
      newPlan.steps = [...plan.steps, createPlanStep];

      apolloCLient.writeQuery({
        query: PLAN_QUERY,
        data: { plan: newPlan },
        variables: { planId },
      });
    },
  });
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleOpenDialog = React.useCallback(() => {
    setDialogOpen(true);
  }, []);
  const handleClose = React.useCallback(() => {
    setDialogOpen(false);
  }, [setDialogOpen]);

  const handleValueChange = React.useCallback(
    (event) => {
      const value = event.target.value;
      const name = event.target.name;

      setInputState({ ...inputState, [name]: value });
    },
    [inputState, setInputState]
  );

  const handleSave = React.useCallback(async () => {
    await createPlanStep({
      variables: {
        input: {
          ...inputState,
          parent: parentId,
          plan: planId,
        },
      },
    });
    handleClose();
  }, [planId, parentId, inputState, createPlanStep]);

  return (
    <>
      <IconButton onClick={handleOpenDialog}>
        <AddStepIcon />
      </IconButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={dialogOpen}
        scroll={'body'}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle>New Step</DialogTitle>
        <DialogContent>
          <Grid container direction={'column'}>
            <Grid item>
              <TextField
                fullWidth
                onChange={handleValueChange}
                label={'Step name'}
                name={'name'}
                onChange={handleValueChange}
                autoComplete={false}
                InputProps={{ autoComplete: false }}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label={'Step description'}
                name={'description'}
                onChange={handleValueChange}
                autoComplete={false}
                InputProps={{ autoComplete: false }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant={'outlined'} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant={'contained'} color={'primary'} onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PlanStepsComponentAddStepBtn;
