import * as React from 'react';
import propTypes from 'prop-types';
import { Button, useTheme } from '@material-ui/core';
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

  const [isHovered, setIsHovered] = React.useState(false);

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
  const theme = useTheme();

  return (
    <Button
      variant={user.connected ? 'outlined' : 'contained'}
      color={'primary'}
      startIcon={
        <AddPersonIcon
          fill={user.connected ? theme.palette.primary.main : null}
        />
      }
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {user.connected ? (isHovered ? 'Disconnect' : 'Connected') : 'Connect'}
    </Button>
  );
}

export default UserConnectButton;
