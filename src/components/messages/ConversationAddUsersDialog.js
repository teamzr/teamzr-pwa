import { useQuery } from '@apollo/client';
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
    communityUsers {
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

function ConversationAddUsersDialog(props) {
  const { open, onCancelClick, conversationId } = props;
  const { loading, error, data } = useQuery(COMMUNITY_USER_QUERY, {
    variables: { conversationId },
  });

  const [selectedUserIds, setSelectedUserIds] = React.useState([]);

  const usersAlreadyIncludedIds = data?.conversation?.users?.map((u) => u.id);

  const users = data?.communityUsers
    .filter((u) => !usersAlreadyIncludedIds.includes(u.id))
    .map((u) => ({ ...u, selected: selectedUserIds.includes(u.id) }));

  const onUserItemClick = (userId) => {
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
    } else {
      setSelectedUserIds([...selectedUserIds, userId]);
    }
  };

  return (
    <UserSelectModalComponent
      loading={loading}
      users={users}
      open={open}
      onCancelClick={onCancelClick}
      onUserItemClick={onUserItemClick}
    />
  );
}

export default ConversationAddUsersDialog;
