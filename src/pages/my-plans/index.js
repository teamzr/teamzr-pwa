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
import CreatePlanDialButton from '../../components/plans/CreatePlanDialButton';
import useAuthContext from '../../context/AuthContext';

export const PLANS_QUERY = gql`
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
      interests {
        id
        name
      }
    }
  }
`;

function Campaigns(props) {
  const { data, error, loading } = useQuery(PLANS_QUERY, {
    fetchPolicy: 'network-only',
  });

  const router = useRouter();
  const [conversationId, setConversationId] = React.useState(
    router?.query?.conversationId
  );

  const { user } = useAuthContext();

  const conversationsObject = {};
  data &&
    data.plans.forEach((p) => {
      const conversation = p.conversation;
      conversationsObject[conversation.id] = conversation;
    });
  let conversations = Object.values(conversationsObject);
  conversations.sort((a, b) => a.type != 'SELF');

  if (loading || error) return <LoadingIndicatorComponent />;

  return (
    <>
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
                    plans={data?.plans}
                    conversationId={conversationId}
                    conversations={conversations}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </DefaultLayout>
      <CreatePlanDialButton
        setConversationId={setConversationId}
        conversationId={conversationId}
        conversations={conversations}
      />
    </>
  );
}

export default Campaigns;
