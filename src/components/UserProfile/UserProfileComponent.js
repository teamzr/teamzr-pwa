import * as React from 'react';
import propTypes from 'prop-types';
import {
  Avatar,
  Badge,
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
import UserProfileInterestsComponent from './UserProfileInterestsComponent';
import { Edit } from '@material-ui/icons';

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

  const handleEdit = React.useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing, setIsEditing]);

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
      setIsEditing(false);
    },
    [actualUser, meUpdate, setIsEditing]
  );

  const onAvatarInputChange = React.useCallback(async () => {
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
  }, [actualUser, avatarInputRef, meUpdate]);

  return (
    <Grid
      container
      direction={'column'}
      justify={'center'}
      alignContent={'center'}
      alignItems={'center'}
      spacing={2}
    >
      <Grid item>
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
          <Avatar className={classes.avatar} src={user.avatar} elevation={2} />
        </Badge>
      </Grid>
      <Grid item>
        <Typography variant={'h3'}>{user.name}</Typography>
      </Grid>
      <Grid item>
        <Typography variant={'h5'}>{user.email}</Typography>
      </Grid>
      <Grid item>
        {isEditing && (
          <TextField
            autoFocus={true}
            multiline
            defaultValue={user.description}
            onBlur={handleDesriptionUpdate}
          />
        )}
        {!isEditing && (
          <Badge
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              isActualUser && (
                <IconButton onClick={handleEdit}>
                  <Edit />
                </IconButton>
              )
            }
          >
            <Typography variant={'body1'}>{user.description}</Typography>
          </Badge>
        )}
      </Grid>
      {!isActualUser && (
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <UserSendMessageButton userId={user.id} />
            </Grid>
            <Grid item>
              <UserConnectButton />
            </Grid>
          </Grid>
        </Grid>
      )}

      <Divider width={'100%'} />
      <Grid item xs={12}>
        <Typography variant={'h6'}>Interests</Typography>
        <UserProfileInterestsComponent />
      </Grid>
    </Grid>
  );
}

const useUserProfileComponentStyle = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default UserProfileComponent;
