import * as React from 'react';
import propTypes from 'prop-types';
import { Container, Grid } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';

import DefaultLayout from '../../pagesLayouts/DefaultLayout';
import LoadingIndicatorComponent from '../../components/LoadingIndicatorComponent';
import MyPlansConversationFilterComponent from '../../components/plans/MyPlansConversationFilterComponent';
import PlanListComponent from '../../components/plans/PlanListComponent';
import { useRouter } from 'next/router';
import MyPlansHeaderComponent from '../../components/plans/MyPlansHeaderComponent';

const PLANS_QUERY = gql`
  {
    plans {
      id
      name
      conversation {
        id
        name
        users {
          id
          avatar
        }
      }
    }
  }
`;

function Campaigns(props) {
  const { data, error, loading } = useQuery(PLANS_QUERY);

  const router = useRouter();
  const [conversationId, setConversationId] = React.useState(
    router?.query?.conversationId
  );

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
      <Container style={{ marginTop: '8px' }}>
        <Grid container direction={'column'} spacing={1}>
          <Grid item xs={12}>
            <MyPlansHeaderComponent />
          </Grid>
          <Grid item xs={12}>
            <MyPlansConversationFilterComponent
              conversations={conversations}
              conversationId={conversationId}
              setConversationId={setConversationId}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container direction={'row'} justify={'center'}>
              <Grid item xs={12}>
                <PlanListComponent
                  plans={data.plans}
                  conversationId={conversationId}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  );
}

export default Campaigns;
