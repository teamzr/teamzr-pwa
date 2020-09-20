import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { gql } from 'apollo-boost';

import PlanStepsComponent from '../planSteps/PlanStepsComponent';
import { useQuery } from '@apollo/client';
import LoadingIndicatorComponent from '../LoadingIndicatorComponent';

const PLAN_QUERY = gql`
  query plan($planId: ID!) {
    plan(id: $planId) {
      id
      name
      description
      author {
        id
        name
      }
      conversation {
        id
        name
      }
    }
  }
`;

function PlanComponent(props) {
  const { planId } = props;

  const { data, error, loading } = useQuery(PLAN_QUERY, {
    variables: { planId },
    skip: !planId,
  });

  if (loading) return <LoadingIndicatorComponent />;
  return (
    <>
      <Grid container direction={'column'} spacing={2}>
        <Grid item>
          <Typography variant={'h4'}>{data.plan.name}</Typography>
          <Typography variant={'body1'}>{data.plan.description}</Typography>
        </Grid>
        <Grid item>
          <PlanStepsComponent planId={planId} />
        </Grid>
      </Grid>
    </>
  );
}

export default PlanComponent;
