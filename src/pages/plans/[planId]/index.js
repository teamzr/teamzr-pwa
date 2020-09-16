import * as React from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';

import DefaultLayout from '../../../pagesLayouts/DefaultLayout';
import LoadingIndicatorComponent from '../../../components/LoadingIndicatorComponent';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { BackArrowIcon } from '../../../constants/Icons';
import PlanStepsComponent from '../../../components/planSteps/PlanStepsComponent';

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
      steps {
        id
        name
        description
        startDate
      }
    }
  }
`;

function Campaign(props) {
  const router = useRouter();
  const { planId } = router.query;

  const { data, error, loading } = useQuery(PLAN_QUERY, {
    variables: { planId },
    skip: !planId,
  });

  const handleBack = React.useCallback(() => {
    router.back();
  }, []);

  if (!planId || loading) return <LoadingIndicatorComponent />;
  return (
    <DefaultLayout>
      <Grid container direction={'row'} justify={'center'}>
        <Grid item xs={12} style={{ position: 'static' }}>
          <IconButton onClick={handleBack}>
            <BackArrowIcon />
          </IconButton>
        </Grid>

        <Grid item>
          <Grid container direction={'column'} spacing={2}>
            <Grid item>
              <Typography variant={'h4'}>{data.plan.name}</Typography>
              <Typography variant={'body1'}>{data.plan.description}</Typography>
            </Grid>
            <Grid item>
              <PlanStepsComponent planId={planId} planSteps={data.plan.steps} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}

export default Campaign;
