import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client/core';
import * as React from 'react';
import UserSelectModalComponent from './UserSelectModalComponent';

const COMMUNITY_USER_QUERY = gql`
  {
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

function UserSelectModal(props) {
  const { open, onCancelClick } = props;
  const { loading, error, data } = useQuery(COMMUNITY_USER_QUERY);

  return (
    <UserSelectModalComponent
      loading={loading}
      users={data?.communityUsers}
      open={open}
      onCancelClick={onCancelClick}
    />
  );
}

export default UserSelectModal;
