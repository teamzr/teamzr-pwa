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

  const [name, setName] = React.useState('');

  React.useEffect(() => {
    setName(data?.conversation?.name);
  }, [data?.conversation?.name, setName]);

  const handleChange = React.useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const handleRename = React.useCallback(
    async (event) => {
      const value = event.target.value;
      await updateConversation({
        variables: { input: { id: conversationId, name: value } },
      });
    },
    [name]
  );

  if (loading) return '';
  return (
    <TextField
      InputProps={{ disableUnderline: true }}
      fullWidth
      value={name}
      variant={'standard'}
      onChange={handleChange}
      onBlur={handleRename}
    />
  );
}

ConversationTitleComponent.propTypes = {
  conversationId: propTypes.string,
};

export default ConversationTitleComponent;
