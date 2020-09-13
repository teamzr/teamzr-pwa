import * as React from 'react';
import propTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/client';
import { TextField } from '@material-ui/core';

const CONVERSATION_QUERY = gql`
  query conversation($id: ID!) {
    conversation(id: $id) {
      id
      name
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

  const handleRename = React.useCallback(async (event) => {
    const value = event.target.value;
    await updateConversation({
      variables: { input: { id: conversationId, name: value } },
    });
  }, []);

  if (loading) return '';
  return (
    <TextField
      defaultValue={data.conversation.name}
      variant={'standard'}
      onBlur={handleRename}
    />
  );
}

ConversationTitleComponent.propTypes = {
  conversationId: propTypes.string,
};

export default ConversationTitleComponent;
