import * as React from 'react';
import propTypes from 'prop-types';
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';

import PlanStepsComponentAddStepBtn from './PlanStepsComponentAddStepBtn';
import LoadingIndicatorComponent from '../LoadingIndicatorComponent';
import PlanStepsItemComponent from './PlanStepsItemComponent';
import PlanStepsDialogComponent from './PlanStepsDialogComponent';
import { ItemTypes } from './PlanStepsConstants';
import { UPDATE_PLAN_STEP_MUTATION } from './PlanStepsDialogComponent';
import { useApolloClient, useMutation } from '@apollo/client';
import { PLAN_STEPS_QUERY } from '../plans/PlanComponent';

export const PLAN_STEP_STATUSES = {
  UNDEFINED: 'UNDEFINED',
  COMPLETED: 'COMPLETED',
  UPCOMING: 'UPCOMING',
  CURRENT: 'CURRENT',
};

function PlanStepsComponent(props) {
  const { planId, planStepsData } = props;

  const [planSteps, setPlanSteps] = React.useState(planStepsData);

  React.useEffect(() => {
    setPlanSteps(planStepsData);
  }, [planStepsData]);

  const [stepDialogState, setStepDialogState] = React.useState({
    planStepId: null,
  });

  const handleStepClick = React.useCallback(
    (planStepId) => {
      setStepDialogState({ planStepId });
    },
    [setStepDialogState]
  );

  const handleCloseStepsDialog = React.useCallback(() => {
    setStepDialogState({ ...stepDialogState, planStepId: null });
  }, [setStepDialogState, setStepDialogState]);

  const [, drop] = useDrop({ accept: ItemTypes.PLAN_STEP });

  const apolloCLient = useApolloClient();
  const [updatePlanStep] = useMutation(UPDATE_PLAN_STEP_MUTATION, {
    update: (cache, { data: { updatePlanStep } }) => {
      const { planSteps } = apolloCLient.readQuery({
        query: PLAN_STEPS_QUERY,
        variables: { planId },
      });

      const newPlanSteps = [...planSteps];
      const index = newPlanSteps.findIndex((s) => s.id == updatePlanStep.id);
      newPlanSteps.splice(index, 1);
      newPlanSteps.splice(updatePlanStep.number - 1, 0, updatePlanStep);

      const toWrite = newPlanSteps.map((step, i) => {
        const newStep = { ...step };
        newStep.number = i + 1;
        return newStep;
      });

      apolloCLient.writeQuery({
        query: PLAN_STEPS_QUERY,
        data: { planSteps: toWrite },
        variables: { planId },
      });
    },
  });

  const moveStep = React.useCallback(
    (id, atIndex, didDrop) => {
      const { planStep, index } = findStep(id);
      setPlanSteps(
        update(planSteps, {
          $splice: [
            [index, 1],
            [atIndex, 0, planStep],
          ],
        })
      );
    },
    [planSteps, setPlanSteps]
  );

  const findStep = React.useCallback(
    (id) => {
      const planStep = planSteps.filter((c) => `${c.id}` === id)[0];
      const index = planSteps.indexOf(planStep);

      return {
        planStep,
        index,
      };
    },
    [planSteps]
  );

  return (
    <>
      <Grid container direction={'column'} style={{ paddingBottom: '45px' }}>
        <Grid item>
          <List innerRef={drop}>
            {planSteps.map((step, i) => (
              <PlanStepsItemComponent
                key={step.id}
                id={step.id}
                planId={planId}
                findStep={findStep}
                moveStep={moveStep}
                planStepId={step.id}
                name={step.name}
                description={step.description}
                number={step.number}
                status={step.status}
                onClick={handleStepClick}
                updatePlanStep={updatePlanStep}
              />
            ))}
          </List>
          {planSteps.length == 0 && (
            <Grid item>
              <PlanStepsComponentAddStepBtn planId={planId} />
            </Grid>
          )}
        </Grid>
      </Grid>
      {stepDialogState.planStepId && (
        <PlanStepsDialogComponent
          planStepId={stepDialogState.planStepId}
          handleClose={handleCloseStepsDialog}
        />
      )}
    </>
  );
}

export default PlanStepsComponent;
