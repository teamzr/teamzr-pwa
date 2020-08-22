import * as React from 'react';
import propTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from '@material-ui/core';

import ConversationComponent from './ConversationComponent';
import LoadingIndicatorComponent from '../LoadingIndicatorComponent';
import { BackArrowIcon } from '../../constants/Icons';
import ConversationsSearchBarComponent from './ConversationsSearchBarComponent';

const GET_CONVERSATIONS_QUERY = gql`
  {
    conversations {
      id
      name
      readByIds
      updatedAt
      messages {
        id
        text
      }

      users {
        id
        name
      }
    }
    me {
      id
    }
  }
`;

function ConversationsComponent(props) {
  const { loading, error, data } = useQuery(GET_CONVERSATIONS_QUERY);

  if (loading) return <LoadingIndicatorComponent />;
  const { conversations } = data;
  return (
    <Grid
      container
      direction={'row'}
      justify={'center'}
      alignContent={'center'}
      alignItems={'center'}
    >
      <Grid item xs={12} md={3}>
        <Grid container justify={'center'} direction={'column'}>
          <Grid item xs={12}>
            <BackArrowIcon />
          </Grid>
          <Grid item>
            <ConversationsSearchBarComponent />
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '50px' }}>
            {conversations.map((c) => (
              <ConversationComponent
                name={c.name}
                conversationId={c.id}
                updatedAt={c.updatedAt}
                users={c.users}
                messages={c.messages}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} md={9}></Grid>
    </Grid>
  );
}

ConversationsComponent.propType = {};

export default ConversationsComponent;
