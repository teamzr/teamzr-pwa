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
  Typography,
  IconButton,
  Divider,
  makeStyles,
} from '@material-ui/core';
import { LeftChevronIcon, VerticalDotsIcon } from '../../constants/Icons';
import PlanStepsDialogPhaseDiagram from './PlanStepsDialogPhaseDiagram';
import PlanStepsDialogSubstepsComponent from './PlanStepsDialogSubstepsComponent';
import PlanStepsDialogDurationComponent from './PlanStepsDialogDurationComponent';

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

  const classes = makePlanStepsDialogComponent();

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
      maxWidth={'md'}
    >
      <Grid
        container
        direction={'row'}
        justify={'space-between'}
        alignItems={'center'}
        alignContent={'center'}
      >
        <Grid item xs={1}>
          <IconButton onClick={handleClose}>
            <LeftChevronIcon />
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          <Typography align={'center'} variant={'h5'}>
            Step definition
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton>
            <VerticalDotsIcon />
          </IconButton>
        </Grid>
      </Grid>

      <DialogContent>
        <Grid container direction={'column'} spacing={2}>
          <Grid item>
            <Grid container justify={'center'}>
              <Grid item>
                <PlanStepsDialogPhaseDiagram />
              </Grid>
            </Grid>
            <Divider />
          </Grid>
          <Grid item>
            <Typography variant={'h6'}>About</Typography>
            <TextField
              className={classes.input}
              fullWidth
              style={{ borderRadius: '12px' }}
              value={planStepState.name}
              onChange={handleValueChange}
              placeholder={'Step name'}
              name={'name'}
              autoComplete={'off'}
              InputProps={{ autoComplete: 'off', disableUnderline: true }}
              inputProps={{ autoComplete: 'off' }}
              onBlur={handleUpdate}
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.input}
              multiline
              rows={3}
              rowsMax={6}
              fullWidth
              placeholder={'Describe step briefly'}
              name={'description'}
              value={planStepState.description}
              onChange={handleValueChange}
              autoComplete={'off'}
              InputProps={{ autoComplete: 'off', disableUnderline: true }}
              inputProps={{ autoComplete: 'off' }}
              onBlur={handleUpdate}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'h6'}>Substeps</Typography>
            <PlanStepsDialogSubstepsComponent />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'h6'}>Step duration</Typography>
            <PlanStepsDialogDurationComponent />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

PlanStepsDialogComponent.propTypes = {
  stepId: propTypes.string,
  handleClose: propTypes.func,
};

const makePlanStepsDialogComponent = makeStyles((theme) => ({
  input: {
    border: '1.84px solid #DDDDDB',
    borderRadius: theme.spacing(1),
  },
}));

export default PlanStepsDialogComponent;
