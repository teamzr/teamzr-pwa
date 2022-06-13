import * as React from 'react';
import propTypes from 'prop-types';
import { useQuery, gql, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import { Grid, makeStyles } from '@material-ui/core';

import LoadingIndicatorComponent from '../LoadingIndicatorComponent';
import MessageComponent from './MessageComponent';
import useAuthContext from '../../context/AuthContext';

export const GET_MESSAGES_FROM_QUERY = gql`
  query messages($recipients: [ID], $conversationId: ID) {
    messages(conversationId: $conversationId, recipients: $recipients) {
      id
      author {
        id
        name
      }
      conversation {
        id
        readByIds
      }
      text
      createdAt
    }
    me {
      id
      name
    }
  }
`;

const MARK_CONVERSATION_AS_READ_MUTATION = gql`
  mutation markConversationAsRead($id: ID!) {
    markConversationAsRead(id: $id) {
      id
      readByIds
    }
  }
`;

function MessagesComponent(props) {
  const { conversationId } = props;

  const classes = useMessagesComponent();

  // TODO: Solve it for mobile.
  const [markConversationAsRead] = useMutation(
    MARK_CONVERSATION_AS_READ_MUTATION
  );

  const { loading, error, data } = useQuery(GET_MESSAGES_FROM_QUERY, {
    variables: {
      conversationId,
    },
    pollInterval: 800,
  });
  const authCtx = useAuthContext();

  if (loading) return <LoadingIndicatorComponent />;

  return (
    <Grid
      container
      direction={'column'}
      justify={'center'}
      alignContent={'stretch'}
      className={classes.container}
    >
      <Grid item xs={12} className={classes.messagesGridItem}>
        {data.messages.map((m, key) => {
          const fromMe = m.author.id == authCtx.user.id;
          const date = moment(parseInt(m.createdAt)).format('DD.MM. HH:mm');
          if (
            m?.conversation?.id == conversationId &&
            !m?.conversation?.readByIds?.includes(authCtx.user.id)
          ) {
            markConversationAsRead({ variables: { id: conversationId } });
          }
          return (
            <Grid
              key={key}
              container
              direction={'row'}
              justify={fromMe ? 'flex-end' : 'flex-start'}
            >
              <Grid item xs={8}>
                <MessageComponent
                  fromMe={fromMe}
                  text={m.text}
                  authorName={m.author.name}
                  date={date}
                />
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

MessagesComponent.propTypes = {
  conversationId: propTypes.string,
};

const useMessagesComponent = makeStyles((theme) => ({
  container: {},
  messagesGridItem: {
    '& > :last-child': {
      marginBottom: theme.spacing(13),
    },
  },
}));

export default MessagesComponent;
