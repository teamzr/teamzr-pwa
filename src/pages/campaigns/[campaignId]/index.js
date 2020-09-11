import * as React from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';

import DefaultLayout from '../../../pagesLayouts/DefaultLayout';
import LoadingIndicatorComponent from '../../../components/LoadingIndicatorComponent';
import { Grid, Typography } from '@material-ui/core';

const CAMPAIGN_QUERY = gql`
  query campaign($campaignId: ID!) {
    campaign(id: $campaignId) {
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
  const { campaignId } = router.query;

  const { data, error, loading } = useQuery(CAMPAIGN_QUERY, {
    variables: { campaignId },
    skip: !campaignId,
  });

  if (!campaignId || loading) return <LoadingIndicatorComponent />;
  return (
    <DefaultLayout>
      <Typography variant={'h4'}>{data.campaign.name}</Typography>
      <Typography variant={'body1'}>{data.campaign.description}</Typography>
    </DefaultLayout>
  );
}

export default Campaign;
