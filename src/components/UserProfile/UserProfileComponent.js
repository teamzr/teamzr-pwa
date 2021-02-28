import * as React from 'react';
import propTypes from 'prop-types';
import { Avatar, Grid, TextField, Typography } from '@material-ui/core';
import UserConnectButton from './UserConnectButton';
import UserSendMessageButton from './UserSendMessageButton';
import useAuthContext from '../../context/AuthContext';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/client';

const UPDATE_USER_MUTATION = gql`
  mutation meUpdate($input: ActualUserInput) {
    meUpdate(input: $input) {
      id
      description
    }
  }
`;

function UserProfileComponent(props) {
  const { user } = props;
  const { user: actualUser } = useAuthContext();

  const [meUpdate] = useMutation(UPDATE_USER_MUTATION);

  const isActualUser = actualUser.id === user.id;

  const handleDesriptionUpdate = React.useCallback(
    (event) => {
      const value = event.target.value;

      meUpdate({
        variables: {
          input: {
            id: actualUser.id,
            description: value,
          },
        },
      });
    },
    [actualUser, meUpdate]
  );

  return (
    <Grid
      container
      direction={'column'}
      justify={'center'}
      alignContent={'center'}
      alignItems={'center'}
    >
      <Grid item>
        <Avatar
          style={{ width: '100%', height: '100%' }}
          src={user.avatar}
          elevation={2}
        />
      </Grid>
      <Grid item>
        <Typography variant={'h3'}>{user.name}</Typography>
      </Grid>
      <Grid item>
        <Typography variant={'h5'}>{user.email}</Typography>
      </Grid>
      <Grid item>
        <UserConnectButton />
        <UserSendMessageButton userId={user.id} />
      </Grid>
      <Grid item>
        {isActualUser && (
          <TextField
            multiline
            defaultValue={user.description}
            onBlur={handleDesriptionUpdate}
          />
        )}
        {!isActualUser && (
          <Typography variant={'body1'}>{user.description}</Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default UserProfileComponent;
