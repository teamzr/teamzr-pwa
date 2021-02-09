import * as React from 'react';
import propTypes from 'prop-types';
import { Avatar, Grid, Typography } from '@material-ui/core';
import UserConnectButton from './UserConnectButton';
import UserSendMessageButton from './UserSendMessageButton';

function UserProfileComponent(props) {
  const { user } = props;
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
          src={`https://randomuser.me/api/portraits/${
            Math.random() < 0.5 ? 'men' : 'men'
          }/${Math.ceil(Math.random() * 100)}.jpg`}
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
    </Grid>
  );
}

export default UserProfileComponent;
