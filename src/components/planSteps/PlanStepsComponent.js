import * as React from 'react';
import propTypes from 'prop-types';
import { Box, Grid, IconButton, List, Typography } from '@material-ui/core';
import PlanStepsComponentAddStepBtn from './PlanStepsComponentAddStepBtn';
import moment from 'moment';
import { gql, useQuery } from '@apollo/client';
import LoadingIndicatorComponent from '../LoadingIndicatorComponent';
import PlanStepsItemComponent from './PlanStepsItemComponent';

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
  COMPLETED: 'COMPLETED',
  UPCOMING: 'UPCOMING',
  CURRENT: 'CURRENT',
};

function PlanStepsComponent(props) {
  const { planId } = props;

  const { loading, error, data } = useQuery(PLAN_STEPS_QUERY, {
    variables: { planId },
  });

  if (loading) return <LoadingIndicatorComponent />;
  return (
    <Grid container direction={'column'} style={{ paddingBottom: '45px' }}>
      <Grid item>
        <List>
          {data.planSteps.map((step, i) => (
            <>
              <PlanStepsItemComponent
                key={i}
                name={step.name}
                description={step.description}
                number={step.number}
                status={step.status}
              />
              <PlanStepsComponentAddStepBtn
                parentId={step.id}
                planId={planId}
              />
            </>
          ))}
        </List>
        {data.planSteps.length == 0 && (
          <Grid item>
            <PlanStepsComponentAddStepBtn planId={planId} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default PlanStepsComponent;
