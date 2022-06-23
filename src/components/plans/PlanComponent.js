import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';

import PlanStepsComponent from '../planSteps/PlanStepsComponent';
import { useQuery, gql, useMutation } from '@apollo/react-hooks';
import LoadingIndicatorComponent from '../LoadingIndicatorComponent';
import { DatePicker } from '@material-ui/pickers';
import { PLAN_QUERY } from '../../gql-queries/queries';
import { UPDATE_PLAN_MUTATION } from '../../gql-mutations/mutations';

export const PLAN_STEPS_QUERY = gql`
  query planSteps($planId: ID!) {
    planSteps(where: { plan: $planId }) {
      id
      name
      description
      startDate
      endDate
      number
      status
      duration
      fulfillments {
        id
        value
        user {
          id
          avatar
        }
      }
      plan {
        id
      }
      parent {
        id
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

  const [updatePlan] = useMutation(UPDATE_PLAN_MUTATION);

  const {
    loading: planStepsLoading,
    error: planStepsError,
    data: planStepsData,
  } = useQuery(PLAN_STEPS_QUERY, {
    fetchPolicy: 'network-only',
    pollInterval: 2000,
    variables: { planId },
  });

  const handlePlanStartDateChange = (value) => {
    updatePlan({
      variables: {
        input: { id: planId, startDate: value.utc().toString() },
      },
    });
  };

  if (loading || planStepsLoading) return <LoadingIndicatorComponent />;
  return (
    <>
      <Grid container direction={'column'} spacing={2}>
        <Grid item>
          <Typography variant={'h4'}>{data.plan.name}</Typography>
          <Typography variant={'body1'}>{data.plan.description}</Typography>
        </Grid>
        <Grid item>
          <Grid container direction={'row'}>
            <Grid item>
              <DatePicker
                format={'DD.MM.YYYY'}
                label={'Start Date'}
                value={data.plan.startDate}
                onChange={handlePlanStartDateChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <PlanStepsComponent
            planStepsData={planStepsData.planSteps}
            planId={planId}
            planStartDate={data.plan.startDate}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default PlanComponent;
