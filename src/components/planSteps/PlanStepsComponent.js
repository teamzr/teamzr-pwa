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
import PlanStepsComponentAddStepBtn from './PlanStepsComponentAddStepBtn';
import moment from 'moment';
import { gql, useQuery } from '@apollo/client';
import LoadingIndicatorComponent from '../LoadingIndicatorComponent';
import PlanStepsItemComponent from './PlanStepsItemComponent';
import PlanStepsDialogComponent from './PlanStepsDialogComponent';

export const PLAN_STEPS_QUERY = gql`
  query planSteps($planId: ID!) {
    planSteps(where: { plan: $planId }) {
      id
      name
      description
      number
      status
      plan {
        id
      }
      parent {
        id
      }
    }
  }
`;

export const PLAN_STEP_STATUSES = {
  UNDEFINED: 'UNDEFINED',
  COMPLETED: 'COMPLETED',
  UPCOMING: 'UPCOMING',
  CURRENT: 'CURRENT',
};

function PlanStepsComponent(props) {
  const { planId } = props;

  const { loading, error, data } = useQuery(PLAN_STEPS_QUERY, {
    variables: { planId },
  });

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

  if (loading) return <LoadingIndicatorComponent />;

  return (
    <>
      <Grid container direction={'column'} style={{ paddingBottom: '45px' }}>
        <Grid item>
          <List>
            {data.planSteps.map((step, i) => (
              <li key={i}>
                <PlanStepsItemComponent
                  planId={planId}
                  planStepId={step.id}
                  name={step.name}
                  description={step.description}
                  number={step.number}
                  status={step.status}
                  onClick={handleStepClick}
                />
                <PlanStepsComponentAddStepBtn
                  parentId={step.id}
                  planId={planId}
                  number={step.number}
                />
              </li>
            ))}
          </List>
          {data.planSteps.length == 0 && (
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
