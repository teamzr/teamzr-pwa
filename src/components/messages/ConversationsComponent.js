import * as React from 'react';
import propTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Grid, makeStyles, Hidden } from '@material-ui/core';

import ConversationComponent from './ConversationComponent';
import LoadingIndicatorComponent from '../LoadingIndicatorComponent';
import { BackArrowIcon } from '../../constants/Icons';
import ConversationsSearchBarComponent from './ConversationsSearchBarComponent';
import { useRouter } from 'next/router';
import MessagesComponent from './MessagesComponent';
import MessagesInputBarComponent from './MessagesInputBarComponent';

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
  const classes = useConversationComponentStyle();
  const { loading, error, data } = useQuery(GET_CONVERSATIONS_QUERY);

  const router = useRouter();

  const { conversationId } = router.query;

  if (loading) return <LoadingIndicatorComponent />;
  const { conversations } = data;
  return (
    <Grid
      container
      direction={'row'}
      justify={'flex-start'}
      alignContent={'flex-start'}
      alignItems={'flex-start'}
    >
      <Hidden mdDown={!!conversationId ? true : false}>
        <Grid item xs={12} md={3} className={classes.container}>
          <Grid container justify={'flex-start'} direction={'column'}>
            <Grid item xs={12}>
              <BackArrowIcon style={{ color: 'transparent' }} />
            </Grid>
            <Grid item>
              <ConversationsSearchBarComponent />
            </Grid>
            <Grid item xs={12} style={{ marginBottom: '50px' }}>
              {conversations.map((c) => (
                <ConversationComponent
                  id={c.id}
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
      </Hidden>
      <Hidden mdDown={!!conversationId ? false : true}>
        <Grid item xs={12} md={9}>
          <Grid container direction={'column'}>
            <Grid item className={classes.container}>
              <MessagesComponent conversationId={conversationId} />
            </Grid>
            <Grid item style={{ position: 'relative' }}>
              {!!conversationId && (
                <MessagesInputBarComponent conversationId={conversationId} />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  );
}

ConversationsComponent.propType = {};

const useConversationComponentStyle = makeStyles((theme) => ({
  container: {
    height: 'calc(100vh - 49px)',

    overflowY: 'scroll',
  },
}));

export default ConversationsComponent;
