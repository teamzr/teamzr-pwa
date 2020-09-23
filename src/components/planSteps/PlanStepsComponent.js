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
import { useMutation } from '@apollo/client';

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

  const [updatePlanStep] = useMutation(UPDATE_PLAN_STEP_MUTATION);

  const moveStep = React.useCallback(
    (id, atIndex) => {
      const { planStep, index } = findStep(id);
      setPlanSteps(
        update(planSteps, {
          $splice: [
            [index, 1],
            [atIndex, 0, planStep],
          ],
        })
      );
      updatePlanStep({
        variables: {
          input: {
            id,
            number: atIndex + 1,
          },
        },
      });
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
