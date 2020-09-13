import * as React from 'react';
import propTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';

import DefaultLayout from '../../pagesLayouts/DefaultLayout';
import LoadingIndicatorComponent from '../../components/LoadingIndicatorComponent';
import MyPlansConversationFilterComponent from '../../components/plans/MyPlansConversationFilterComponent';
import MyPlansListComponent from '../../components/plans/PlanListComponent';

const PLANS_QUERY = gql`
  {
    plans {
      id
      name
      conversation {
        id
        name
      }
    }
  }
`;

function Campaigns(props) {
  const { data, error, loading } = useQuery(PLANS_QUERY);
  const [conversationId, setConversationId] = React.useState(null);

  const conversationsObject = {};
  data &&
    data.plans.forEach((p) => {
      const conversation = p.conversation;
      conversationsObject[conversation.id] = conversation;
    });
  const conversations = Object.values(conversationsObject);

  if (loading) return <LoadingIndicatorComponent />;

  return (
    <DefaultLayout>
      <Grid container direction={'column'}>
        <Grid item xs={12}>
          <MyPlansConversationFilterComponent
            conversations={conversations}
            conversationId={conversationId}
            setConversationId={setConversationId}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container direction={'row'} justify={'center'}>
            <Grid item>
              <MyPlansListComponent
                campaigns={data.plans}
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
