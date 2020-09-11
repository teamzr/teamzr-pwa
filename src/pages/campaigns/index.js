import * as React from 'react';
import propTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';
import { SpeedDial } from '@material-ui/lab';

import DefaultLayout from '../../pagesLayouts/DefaultLayout';
import LoadingIndicatorComponent from '../../components/LoadingIndicatorComponent';
import CampaignsConversationFilterComponent from '../../components/campaigns/CampaignsConversationFilterComponent';
import CampaingListComponent from '../../components/campaigns/CampaingListComponent';

const CAMPAIGNS_QUERY = gql`
  {
    campaigns {
      id
      name
      conversation {
        id
        name
      }
    }
    conversations {
      id
      name
    }
  }
`;

function Campaigns(props) {
  const { data, error, loading } = useQuery(CAMPAIGNS_QUERY);
  const [conversationId, setConversationId] = React.useState(null);

  if (loading) return <LoadingIndicatorComponent />;
  return (
    <DefaultLayout>
      <Grid container direction={'column'}>
        <Grid item>
          <CampaignsConversationFilterComponent
            conversations={data.conversations}
            conversationId={conversationId}
            setConversationId={setConversationId}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container direction={'row'} justify={'center'}>
            <Grid item>
              <CampaingListComponent
                campaigns={data.campaigns}
                conversationId={conversationId}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}

export default Campaigns;
