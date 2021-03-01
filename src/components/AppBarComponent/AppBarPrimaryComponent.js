import * as React from 'react';
import propTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';

import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import useAuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';

function AppBarPrimaryComponent() {
  const authContext = useAuthContext();
  const [avatarMenuEl, setAvatarMenuEl] = React.useState(null);
  const onAvatarClick = React.useCallback(
    (event) => {
      const target = event.target;

      setAvatarMenuEl(target);
    },
    [setAvatarMenuEl]
  );

  const router = useRouter();

  const handleMyProfile = React.useCallback(() => {
    router.push(`/users/[userName]`, `/users/${authContext.user.id}`);
    setAvatarMenuEl(null);
  }, [authContext, router, setAvatarMenuEl]);

  const handleSignOut = React.useCallback(() => {
    authContext.logout();
  }, [authContext]);

  const onCloseAvatarMenu = React.useCallback(() => {
    setAvatarMenuEl(null);
  }, [setAvatarMenuEl]);
  return (
    <>
      <IconButton
        aria-controls="avatar-menu"
        aria-haspopup="true"
        onClick={onAvatarClick}
      >
        <Avatar sizes={'sm'} />
      </IconButton>
      <Menu
        id={'avatar-menu'}
        anchorEl={avatarMenuEl}
        open={!!avatarMenuEl}
        onClose={onCloseAvatarMenu}
      >
        <MenuItem onClick={handleMyProfile}>My profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
      <Typography variant={'h6'} style={{ flexGrow: 1 }}>
        {authContext.user && authContext.user.name}
      </Typography>
      <IconButton>
        <SearchIcon color={'secondary'} />
      </IconButton>
      <IconButton color={'secondary'}>
        <MenuIcon />
      </IconButton>{' '}
    </>
  );
}

export default AppBarPrimaryComponent;
