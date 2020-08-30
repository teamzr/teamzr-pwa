import * as React from 'react';
import propTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import {
  Grid,
  makeStyles,
  Hidden,
  Button,
  IconButton,
} from '@material-ui/core';

import ConversationComponent from './ConversationComponent';
import LoadingIndicatorComponent from '../LoadingIndicatorComponent';
import { BackArrowIcon } from '../../constants/Icons';
import ConversationsSearchBarComponent from './ConversationsSearchBarComponent';
import { useRouter } from 'next/router';
import MessagesComponent from './MessagesComponent';
import MessagesInputBarComponent from './MessagesInputBarComponent';
import useAuthContext from '../../context/AuthContext';

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
  const { loading, error, data } = useQuery(GET_CONVERSATIONS_QUERY, {
    pollInterval: 1000,
  });
  const authCtx = useAuthContext();
  const router = useRouter();

  const { conversationId } = router.query;

  const handleAddCampaign = React.useCallback(() => {
    router.push({ pathname: '/campaigns/new', query: { conversationId } });
  }, [conversationId]);

  const handleGoBack = React.useCallback(() => {
    router.push('/');
  }, []);

  const handleBackToConversations = React.useCallback(() => {
    router.push('/messages');
  }, []);

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
      <Hidden smDown={!!conversationId ? true : false}>
        <Grid item xs={12} md={3} className={classes.container}>
          <Grid container justify={'flex-start'} direction={'column'}>
            <Grid item xs={12}>
              <IconButton onClick={handleGoBack}>
                <BackArrowIcon style={{ color: 'transparent' }} />
              </IconButton>
            </Grid>
            <Grid item>
              <ConversationsSearchBarComponent />
            </Grid>
            <Grid item xs={12} style={{ marginBottom: '50px' }}>
              {conversations.map((c) => {
                const isRead = c.readByIds.includes(authCtx.user.id);
                return (
                  <ConversationComponent
                    id={c.id}
                    name={c.name}
                    conversationId={c.id}
                    updatedAt={c.updatedAt}
                    users={c.users}
                    messages={c.messages}
                    read={isRead}
                  />
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden smDown={!!conversationId ? false : true}>
        <Grid item xs={12} md={9}>
          {conversationId && (
            <Grid item xs={12} className={classes.panel}>
              <Grid
                container
                direction={'row'}
                justify={'space-between'}
                spacing={2}
              >
                <Grid item>
                  <Hidden mdUp>
                    <IconButton onClick={handleBackToConversations}>
                      <BackArrowIcon style={{ color: 'transparent' }} />
                    </IconButton>
                  </Hidden>
                </Grid>
                <Grid item>
                  <Button variant={'contained'} onClick={handleAddCampaign}>
                    + Add campaign
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
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
  panel: {
    height: theme.spacing(7),
    background: theme.palette.secondary.light,
  },
}));

export default ConversationsComponent;

function notifyMe(text) {
  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === 'granted') {
    // If it's okay let's create a notification
    var notification = new Notification(text);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        var notification = new Notification(text);
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}
