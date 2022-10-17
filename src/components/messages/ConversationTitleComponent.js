import * as React from 'react';
import propTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/client';
import { Avatar, Box, Grid, TextField, Tooltip } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';

const CONVERSATION_QUERY = gql`
  query conversation($id: ID!) {
    conversation(id: $id) {
      id
      name
      type
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

  const isGroup = data?.conversation?.type == 'GROUP';

  React.useEffect(() => {
    if (isGroup) {
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
      <Grid item xs={'auto'}>
        <AvatarGroup max={5}>
          {data.conversation.users.map((u) => (
            <Tooltip title={u.name}>
              <Avatar src={u.avatar} />
            </Tooltip>
          ))}
        </AvatarGroup>
      </Grid>
      <Grid item xs={8}>
        <TextField
          InputProps={{ disableUnderline: true }}
          fullWidth
          disabled={!isGroup}
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
