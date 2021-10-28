import * as React from 'react';
import propTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/client';
import { Avatar, Box, Grid, TextField } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';

const CONVERSATION_QUERY = gql`
  query conversation($id: ID!) {
    conversation(id: $id) {
      id
      name
      users {
        id
        name
        avatar
      }
    }
  }
`;

const UPDATE = gql`
  mutation updateConversation($input: ConversationUpdateInput!) {
    updateConversation(input: $input) {
      id
      name
    }
  }
`;

function ConversationTitleComponent(props) {
  const { conversationId } = props;
  const { loading, data, error } = useQuery(CONVERSATION_QUERY, {
    variables: { id: conversationId },
  });
  const [updateConversation] = useMutation(UPDATE);

  const [name, setName] = React.useState('');

  React.useEffect(() => {
    if (data?.conversation?.users.length > 2) {
      setName(data?.conversation?.name);
    } else {
      setName(data?.conversation?.users[0].name);
    }
  }, [data?.conversation?.name, setName]);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleRename = async (event) => {
    const value = event.target.value;
    await updateConversation({
      variables: { input: { id: conversationId, name: value } },
    });
  };

  if (loading) return '';
  return (
    <Grid container direction={'row'} alignItems={'center'} spacing={1}>
      <Grid item xs={2}>
        <AvatarGroup max={5}>
          {data.conversation.users.map((u) => (
            <Avatar src={u.avatar} />
          ))}
        </AvatarGroup>
      </Grid>
      <Grid item xs={8}>
        <TextField
          InputProps={{ disableUnderline: true }}
          fullWidth
          disabled={data?.conversation?.users.length <= 2}
          value={name}
          variant={'standard'}
          onChange={handleChange}
          onBlur={handleRename}
        />
      </Grid>
    </Grid>
  );
}

ConversationTitleComponent.propTypes = {
  conversationId: propTypes.string,
};

export default ConversationTitleComponent;
