import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client/core';
import * as React from 'react';
import UserSelectModalComponent from '../UserSelectModal/UserSelectModalComponent';

const COMMUNITY_USER_QUERY = gql`
  query users($conversationId: ID!) {
    conversation(id: $conversationId) {
      id
      users {
        id
      }
    }
    users {
      id
      name
      avatar
      description
      interests {
        id
        name
      }
      email
    }
  }
`;

const UPDATE_CONVERSATION_MUTATION = gql`
  mutation updateConversation($input: ConversationUpdateInput!) {
    updateConversation(input: $input) {
      id
      name
      users {
        id
        name
      }
    }
  }
`;

function ConversationAddUsersDialog(props) {
  const { open, setOpen, onCancelClick, conversationId } = props;

  const [updateConversation] = useMutation(UPDATE_CONVERSATION_MUTATION);
  const { loading, error, data } = useQuery(COMMUNITY_USER_QUERY, {
    variables: { conversationId },
  });

  const [selectedUserIds, setSelectedUserIds] = React.useState([]);
  React.useEffect(() => {
    setSelectedUserIds([]);
  }, [open]);

  const usersAlreadyIncludedIds = data?.conversation?.users?.map((u) => u.id);

  const users = data?.users
    .filter((u) => !usersAlreadyIncludedIds.includes(u.id))
    .map((u) => ({ ...u, selected: selectedUserIds.includes(u.id) }));

  const onUserItemClick = (userId) => {
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
    } else {
      setSelectedUserIds([...selectedUserIds, userId]);
    }
  };

  const onAddUsersClick = () => {
    updateConversation({
      variables: {
        input: {
          id: conversationId,
          users: {
            values: selectedUserIds,
            action: 'ADD',
          },
        },
      },
    });
    setOpen(false);
  };

  return (
    <UserSelectModalComponent
      loading={loading}
      users={users}
      open={open}
      onCancelClick={onCancelClick}
      onAddUsersClick={onAddUsersClick}
      onUserItemClick={onUserItemClick}
    />
  );
}

export default ConversationAddUsersDialog;
