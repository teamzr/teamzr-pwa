import * as React from 'react';
import propTypes from 'prop-types';
import { useQuery, gql } from '@apollo/react-hooks';
import LoadingIndicatorComponent from '../LoadingIndicatorComponent';
import MessageComponent from './MessageComponent';
import useAuthContext from '../../context/AuthContext';
import { Grid, makeStyles } from '@material-ui/core';

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

function MessagesComponent(props) {
  const { conversationId } = props;

  const classes = useMessagesComponent();

  const { loading, error, data } = useQuery(GET_MESSAGES_FROM_QUERY, {
    variables: {
      conversationId,
    },
  });
  const authCtx = useAuthContext();

  if (loading) return <LoadingIndicatorComponent />;

  return (
    <Grid
      container
      direction={'column'}
      justify={'center'}
      alignContent={'stretch'}
      spacing={4}
      className={classes.container}
    >
      <Grid item xs={12} md={12}>
        {data.messages.map((m) => {
          const fromMe = m.author.id == authCtx.user.id;
          return (
            <Grid
              container
              direction={'row'}
              justify={fromMe ? 'flex-end' : 'flex-start'}
            >
              <Grid item xs={6}>
                <MessageComponent
                  fromMe={fromMe}
                  text={m.text}
                  authorName={m.author.name}
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
}));

export default MessagesComponent;
