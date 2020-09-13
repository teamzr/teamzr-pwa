import * as React from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';

import DefaultLayout from '../../../pagesLayouts/DefaultLayout';
import LoadingIndicatorComponent from '../../../components/LoadingIndicatorComponent';
import { Grid, Typography } from '@material-ui/core';

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

function Campaign(props) {
  const router = useRouter();
  const { planId } = router.query;

  const { data, error, loading } = useQuery(PLAN_QUERY, {
    variables: { planId },
    skip: !planId,
  });

  if (!planId || loading) return <LoadingIndicatorComponent />;
  return (
    <DefaultLayout>
      <Typography variant={'h4'}>{data.plan.name}</Typography>
      <Typography variant={'body1'}>{data.plan.description}</Typography>
    </DefaultLayout>
  );
}

export default Campaign;
