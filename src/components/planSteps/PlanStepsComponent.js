import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, List } from '@material-ui/core';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';

import PlanStepsComponentAddStepBtn from './PlanStepsComponentAddStepBtn';
import PlanStepsItemComponent from './PlanStepsItemComponent';
import PlanStepsDialogComponent from './../planStepDetail/PlanStepsDialogComponent';
import { ItemTypes, PLAN_STEP_STATUSES } from './PlanStepsConstants';
import { useApolloClient, useMutation } from '@apollo/client';
import { PLAN_STEPS_QUERY } from '../plans/PlanComponent';
import { UPDATE_PLAN_STEP_MUTATION } from '../planStepDetail/PlanStepDetailSettingsTab';

function PlanStepsComponent(props) {
  const { planId, planStepsData } = props;

  const [planSteps, setPlanSteps] = React.useState(planStepsData);

  React.useEffect(() => {
    setPlanSteps(planStepsData);
  }, [planStepsData]);

  const [stepDialogState, setStepDialogState] = React.useState({
    planStepId: null,
  });

  const handleStepClick = (planStepId) => {
    setStepDialogState({ planStepId });
  };

  const handleCloseStepsDialog = () => {
    setStepDialogState({ ...stepDialogState, planStepId: null });
  };

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

  const moveStep = (id, atIndex, didDrop) => {
    const { planStep, index } = findStep(id);
    setPlanSteps(
      update(planSteps, {
        $splice: [
          [index, 1],
          [atIndex, 0, planStep],
        ],
      })
    );
  };

  const findStep = (id) => {
    const planStep = planSteps.filter((c) => `${c.id}` === id)[0];
    const index = planSteps.indexOf(planStep);

    return {
      planStep,
      index,
    };
  };

  return (
    <>
      <Grid container direction={'column'} style={{ paddingBottom: '45px' }}>
        <Grid item>
          <List innerRef={drop}>
            {planSteps.map((step, i) => (
              <div key={i}>
                <PlanStepsItemComponent
                  id={step.id}
                  planId={planId}
                  parentId={step?.parent?.id}
                  findStep={findStep}
                  moveStep={moveStep}
                  planStepId={step.id}
                  name={step.name}
                  description={step.description}
                  number={step.number}
                  status={step.status}
                  startDate={step.startDate}
                  endDate={step.endDate}
                  onClick={handleStepClick}
                  updatePlanStep={updatePlanStep}
                  fulfillments={step.fulfillments}
                  planStepDuration={step.duration}
                  planStepStatus={step.status}
                />
              </div>
            ))}
          </List>
          {!planSteps.length && (
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
