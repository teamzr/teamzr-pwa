import * as React from 'react';
import propTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { AddPersonIcon } from '../../constants/Icons';
import { gql, useMutation } from '@apollo/client';

const ME_CONNECT_USER_MUTATION = gql`
  mutation meConnectUser($userId: String!) {
    meConnectUser(userId: $userId) {
      id
      connected
    }
  }
`;

const ME_DISCONNECT_USER_MUTATION = gql`
  mutation meDisconnectUser($userId: String!) {
    meDisconnectUser(userId: $userId) {
      id
      connected
    }
  }
`;

function UserConnectButton(props) {
  const { user } = props;

  const [meConnectUser] = useMutation(ME_CONNECT_USER_MUTATION);

  const [meDisconnectUser] = useMutation(ME_DISCONNECT_USER_MUTATION);

  const handleClick = () => {
    if (user.connected) {
      meDisconnectUser({
        variables: {
          userId: user.id,
        },
      });
    } else {
      meConnectUser({
        variables: {
          userId: user.id,
        },
      });
    }
  };

  return (
    <Button
      variant={'contained'}
      color={'primary'}
      startIcon={<AddPersonIcon />}
      onClick={handleClick}
    >
      {user.connected ? 'Unfollow' : 'Follow'}
    </Button>
  );
}

export default UserConnectButton;
