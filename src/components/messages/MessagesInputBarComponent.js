import * as React from 'react';
import propTypes from 'prop-types';
import { Box, makeStyles, Grid } from '@material-ui/core';
import clsx from 'clsx';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import MessagesInputBarTextFieldComponent from './MesssagesInputBarTextFieldComponent';
import MessagesInputBarSendButtonComponent from './MessagesInputBarSendButtonComponent';
import MessagesInputBarImagesButtonComponent from './MessagesInputBarImagesButtonComponent';

const GET_MESSAGES_FROM_QUERY = gql`
  query messages($conversationId: ID, $recipients: [ID]) {
    messages(conversationId: $conversationId, recpients: $recipients) {
      id
      author {
        id
        name
      }
      text
      createdAt
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $conversationId: ID
    $recipients: [ID]
    $text: String!
  ) {
    createMessage(
      conversationId: $conversationId
      recipients: $recipients
      text: $text
    ) {
      id
      author {
        id
      }
      text
    }
  }
`;

function MessagesInputBarComponent(props) {
  const { conversationId } = props;

  const classes = useMessagesInputBarComponent();
  const [multiline, setMultiline] = React.useState(false);
  const [inputText, setInputText] = React.useState(null);

  const [createMessage, { data }] = useMutation(SEND_MESSAGE_MUTATION, {
    onCompleted: () => {
      setInputText(null);
    },
    update(cache, { data: { createMessage } }) {
      const { messages } = cache.readQuery({
        query: GET_MESSAGES_FROM_QUERY,
        variables: { conversationId },
      });
      createMessage.createdAt = Date.now();

      cache.writeQuery({
        query: GET_MESSAGES_FROM_QUERY,
        data: { messages: messages.concat([createMessage]) },
        variables: { conversationId },
      });
    },
  });

  // TODO: Add: recipinets in order to create new conversation
  const handleSend = React.useCallback(() => {
    if (inputText == '') return;
    createMessage({
      variables: { conversationId, text: inputText },
    });
    setInputText('');
  }, [inputText]);

  const toggleMultiline = React.useCallback(() => {
    setMultiline(!multiline);
  }, [multiline, setMultiline]);

  const onMessageChange = React.useCallback((event) => {
    const value = event.target.value;
    setInputText(value);

    event.preventDefault();
  });

  const keyEnterPress = React.useCallback(
    (e) => {
      if (e.keyCode == 13) {
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <Box className={clsx(classes.container, { [classes.focused]: multiline })}>
      <Grid
        container
        direction={'row'}
        justify={'center'}
        alignItems={'center'}
        alignContent={'center'}
        spacing={1}
      >
        <Grid item xs={1}>
          <Grid container direction={'column'} justify={'flex-start'}>
            <Grid item>
              <MessagesInputBarImagesButtonComponent />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Grid
            container
            direction={'column'}
            justify={'center'}
            alignContent={'center)'}
          >
            <Grid item xs={12}>
              <MessagesInputBarTextFieldComponent
                onChange={onMessageChange}
                value={inputText}
                multiline={multiline}
                onFocus={toggleMultiline}
                onBlur={toggleMultiline}
                onKeyDown={keyEnterPress}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container direction={'column'} justify={'flex-start'}>
            <Grid item>
              <MessagesInputBarSendButtonComponent onClick={handleSend} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

MessagesInputBarComponent.propTypes = {
  conversationId: propTypes.string,
};

const useMessagesInputBarComponent = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '55px',
    background: 'linear-gradient(90deg, #14D8C8 0%, #06ADB7 100%)',
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    bottom: 0,
    zIndex: 200,
  },
  focused: {
    height: '80px',
  },
}));

export default MessagesInputBarComponent;
