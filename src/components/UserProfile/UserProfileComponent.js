import * as React from 'react';
import propTypes from 'prop-types';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import UserConnectButton from './UserConnectButton';
import UserSendMessageButton from './UserSendMessageButton';
import useAuthContext from '../../context/AuthContext';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/client';
import { Edit } from '@material-ui/icons';

import UserProfileInterests from './UserProfileInterests';
import { ChipBarItem } from '../planStepDetail/FullfilmentChipBarSelect';

const UPDATE_USER_MUTATION = gql`
  mutation meUpdate($input: ActualUserInput) {
    meUpdate(input: $input) {
      id
      description
      avatar
    }
  }
`;

function UserProfileComponent(props) {
  const { user } = props;
  const { user: actualUser } = useAuthContext();
  const classes = useUserProfileComponentStyle();
  const avatarInputRef = React.useRef();

  const [meUpdate] = useMutation(UPDATE_USER_MUTATION);
  const [isEditing, setIsEditing] = React.useState(false);
  const isActualUser = actualUser.id === user.id;

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDesriptionUpdate = (event) => {
    const value = event.target.value;

    meUpdate({
      variables: {
        input: {
          id: actualUser.id,
          description: value,
        },
      },
    });
    setIsEditing(false);
  };

  const onAvatarInputChange = async () => {
    const avatar = avatarInputRef.current.files[0];
    const validity = avatarInputRef.current.validity;

    if (validity.valid) {
      await meUpdate({
        variables: {
          input: {
            id: actualUser.id,
            avatar,
          },
        },
      });
    }
  };

  return (
    <>
      <Grid
        container
        direction={'column'}
        justify={'center'}
        alignContent={'center'}
        alignItems={'center'}
        spacing={2}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Badge
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              isActualUser && (
                <>
                  <input
                    hidden
                    ref={avatarInputRef}
                    id={'user-profile-avatar'}
                    type={'file'}
                    accept={'image/*'}
                    onChange={onAvatarInputChange}
                  />
                  <label htmlFor={'user-profile-avatar'}>
                    <Edit style={{ cursor: 'pointer' }} />
                  </label>
                </>
              )
            }
          >
            <Avatar
              className={classes.avatar}
              src={user.avatar}
              elevation={2}
            />
          </Badge>
        </Grid>
        <Grid item>
          <Typography variant={'h3'}>{user.name}</Typography>
        </Grid>
        <Grid item>
          <Typography variant={'h5'}>{user.email}</Typography>
        </Grid>
        <Grid item>
          <ChipBarItem
            label={`Community score: 233`}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12}>
          <Box margin={2}>
            {isEditing && (
              <TextField
                fullWidth={true}
                autoFocus={true}
                multiline
                rows={2}
                variant={'outlined'}
                defaultValue={user.description}
                onBlur={handleDesriptionUpdate}
              />
            )}

            {!isEditing && (
              <Typography
                variant={'body1'}
                onClick={isActualUser && handleEdit}
                style={{ cursor: isActualUser ? 'pointer' : 'unset' }}
              >
                {user.description}
                {isActualUser && <Edit />}
              </Typography>
            )}
          </Box>
        </Grid>
        {!isActualUser && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <UserSendMessageButton userId={user.id} />
              </Grid>
              <Grid item>
                <UserConnectButton user={user} />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Divider
        width={'100%'}
        style={{ marginTop: '20px', marginBottom: '20px' }}
      />
      <Grid container>
        <Grid item xs={2}>
          <Typography variant={'h6'}>
            Interests<Typography variant={'subtitle2'}>* 7 max</Typography>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box minWidth={'400'}>
            <Grid
              container
              direction={'row'}
              justify={'center'}
              alignContent={'center'}
              alignItems={'center'}
            >
              <Grid item>
                <UserProfileInterests
                  value={user.interests}
                  userId={user.id}
                  disabled={!isActualUser}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

const useUserProfileComponentStyle = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default UserProfileComponent;
